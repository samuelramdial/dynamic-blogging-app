"use strict";

const id = new URLSearchParams(window.location.search).get('id');
const url = `http://localhost:3000/blogs/${id}`;
const form = document.querySelector('form');
const titleBox = form.querySelector('#title');
const contentBox = form.querySelector('#content');
const submitBtn = document.querySelector('button[type=submit]');
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
            throw Error(`Error ${response.url} ${response.statusText}`);
        blog = await response.json();
        populateForm();
    } catch(error) {
        errorHandling(error.message);
        console.log(error.message);
    }
}

function populateForm()
{
    titleBox.value =  blog.title; 
    contentBox.value = blog.content; 
}

submitBtn.addEventListener('click', updateBlog)

async function updateBlog(e)
{
    if(form.reportValidity())
    {
        e.preventDefault();
        blog.title = titleBox.value; 
        blog.content = contentBox.value;
        try{
            const response = await fetch(url, {
                method: 'PUT', 
                headers: {'Content-Type':'application/json'}, 
                body: JSON.stringify(blog)
            });
            if (!response.ok)
                throw Error(`Error ${response.url} ${response.statusText}`);
            window.location.href = '/';
        } catch(error) {
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