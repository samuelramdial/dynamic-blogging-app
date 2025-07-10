"use strict";
const id = new URLSearchParams(window.location.search).get('id');
const url = `http://localhost:3000/blogs/${id}`;
const articleWrapper = document.querySelector('.wrapper');
const notificationContainer = document.querySelector('.notification-container');
const notification = document.querySelector('.notification');
const closeBtn = document.querySelector('.close');

let blog; 

window.addEventListener('DOMContentLoaded', fetchBlog);

async function fetchBlog()
{
    try{
        const response = await fetch(url);
        if(!response.ok)
        {
            throw Error(`Error ${response.url} ${response.statusText}`);
        }
        blog = await response.json();
        articleWrapper.innerHTML = '';

        const h2 = document.createElement('h2');
        h2.textContent = blog.title;

        const articleHeader = document.createElement('div');
        articleHeader.classList.add('article-header');
        const img = document.createElement('img');
        img.classList.add('avatar');
        img.src = blog.profile;
        img.height = '60';
        img.width = '60';
        img.alt = 'profile picture';
        const author = document.createElement('div');
        author.textContent = `${blog.author} · ${new Date(blog.date).toDateString()}`;
        articleHeader.appendChild(img);
        articleHeader.appendChild(author);

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');
        const aBtn = document.createElement('a');
        aBtn.classList.add('btn');
        aBtn.href = `/edit.html?id=${id}`;
        const editBtn = document.createElement('i');
        editBtn.classList.add('fa-solid');
        editBtn.classList.add('fa-pen');
        aBtn.appendChild(editBtn);
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.addEventListener('click', deleteBlog);
        const deleteBtn = document.createElement('i');
        btn.appendChild(deleteBtn);
        deleteBtn.classList.add('fa-solid');
        deleteBtn.classList.add('fa-trash-can');
        btnContainer.appendChild(aBtn);
        btnContainer.appendChild(btn);

        const p = document.createElement('p');
        p.classList.add('article-body');
        p.textContent = blog.content;

        articleWrapper.appendChild(h2);
        articleWrapper.appendChild(articleHeader);
        articleWrapper.appendChild(btnContainer);
        articleWrapper.appendChild(p);
        
    } catch(error)
    {
        errorHandling(error.message);
        console.log(error.message);
    }
}
async function deleteBlog()
{
    try{
        const response = await fetch(`${url}`, {method: 'DELETE'});
        if (!response.ok)
            throw Error(`Error ${response.url} ${response.statusText}`);
        window.location.href = '/';
    } catch(error) {
        errorHandling(error.message);
        console.log(error.message);
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