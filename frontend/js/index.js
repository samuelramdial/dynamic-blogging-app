"use strict";
const url = 'http://localhost:3000/blogs';
let blogs = [];
let buttons = [];

const MAX_LENGTH = 50;//maximum length of the blog content shown on the page, i.e., if the blog content is longer, truncate it.
const PAGE_LIMIT = 12;//number of blogs per page
const articlesWrapper = document.querySelector('.articles-wrapper');
const notificationContainer = document.querySelector('.notification-container');
const notification = document.querySelector('.notification');
const closeBtn = document.querySelector('.close');


window.addEventListener('DOMContentLoaded', fetchBlogs);

async function fetchBlogs()
{
    try{
        const response = await fetch(`${url}?_page=1&_limit=${PAGE_LIMIT}&_sort=date&_order=desc`);
        if (!response.ok)
            throw Error (`Error ${response.url} ${response.statusText}`);
        blogs = await response.json();
        loadBlogs();
        loadPageButtons(response.headers.get('x-total-count'));
    } catch (error) {
        errorHandling(error.message);
        console.log(error.message);
    }
}

function loadBlogs()
{
    const fragment = document.createDocumentFragment();
    blogs.forEach(blog => fragment.append(generateBlog(blog)));
    articlesWrapper.innerHTML = '';
    articlesWrapper.append(fragment);
}

function generateBlog(blog)
{
    const card = document.createElement('article');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    const img = document.createElement('img');
    img.classList.add('avatar');
    img.src = blog.profile;
    img.width = '60';
    img.height = '60';
    img.alt = 'profile picture';
    const author = document.createElement('div');
    author.textContent = `${blog.author} · ${new Date(blog.date).toDateString()}`;
    cardHeader.appendChild(img)
    cardHeader.appendChild(author);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const h3 = document.createElement('h3');
    h3.textContent = blog.title;
    const p = document.createElement('p');

    if (blog.content.length > MAX_LENGTH)
    {
        let textHolder = [];
        textHolder[0] = blog.content.substring(0, MAX_LENGTH);
        textHolder[1] = blog.content.substring(MAX_LENGTH, blog.content.length);
        p.textContent = textHolder[0] + ' ...';
    }
    else 
    {
        p.textContent = blog.content;
    }
    cardBody.appendChild(h3);
    cardBody.appendChild(p);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    card.addEventListener('click', () => window.location.href = `details.html?id=${blog.id}`);
    return card; 
}

function loadPageButtons(pages)
{
    let page_total; 
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.innerHTML = '';
    buttons = [];
    if((pages / PAGE_LIMIT) % 2 == 0)
    {
        page_total = parseInt((pages/PAGE_LIMIT));
    }
    else
    {
        page_total = parseInt((pages/PAGE_LIMIT) + 1);
    }
    for (let i = 0; i < page_total; i++)
    {
        const button = document.createElement('button');
        button.classList.add('page-btn');
        button.textContent = i + 1;
        buttons.push(button);
        paginationContainer.appendChild(button);
        button.addEventListener('click', change);
    }
    buttons[0].classList.add('active');
}

async function change(e)
{
    
    if(e.currentTarget.classList.contains('active'))
        {
            return;
        }
        else
        {
            document.querySelector('.page-btn.active').classList.remove('active');
            e.currentTarget.classList.add('active');
        }

    try{
        const response = await fetch(`${url}?_page=${parseInt(e.currentTarget.textContent)}&_limit=${PAGE_LIMIT}&_sort=date&_order=desc`);
        if(!response.ok)
            throw Error (`Error ${response.url} ${response.statusText}`)
        blogs = await response.json();
        loadBlogs();
    } catch (error) {
        errorHandling(error.message);
        console.log(error.message);
    }
}

const searchField = document.querySelector('input[type=search]');
searchField.addEventListener('search', filterBlogs);

async function filterBlogs()
{
    if (searchField.value != '')
    {
        try{
            const response = await fetch(`${url}?content_like=${searchField.value}`);
            if (!response.ok)
                throw Error(`Error ${response.url} ${response.statusText}`)
            blogs = await response.json();
            loadBlogs();
            loadPageButtons(blogs.length);
        } catch (error)
        {
            errorHandling(error.message);
            console.log(error.message);
        }
    }
    else
    {
        try{
            const response = await fetch(`${url}?_page=1&_limit=${PAGE_LIMIT}&_sort=date&_order=desc`);
            if(!response.ok)
                throw Error (`Error ${response.url} ${response.statusText}`)
            blogs = await response.json();
            loadBlogs();
            loadPageButtons(response.headers.get('x-total-count'));
        }catch (error) {
            errorHandling(error.message);
            console.log(error.message); 
        }
    }
}

function errorHandling(error)
{
    notification.textContent = error;
    notificationContainer.classList.remove('hidden');
}

closeBtn.addEventListener('click', close);

function close()
{
    notificationContainer.remove();
}
