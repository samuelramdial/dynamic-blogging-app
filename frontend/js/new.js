"use strict";
const submitBtn = document.querySelector('button[type=submit]');
const form = document.querySelector('form');
const titleBox = form.querySelector('#title');
const authorBox = form.querySelector('#author');
const contentBox = form.querySelector('#content');
const notificationContainer = document.querySelector('.notification-container');
const notification = document.querySelector('.notification');
const closeBtn = document.querySelector('.close');
const url = 'http://localhost:3000/blogs';

submitBtn.addEventListener('click', submitBlog);

async function submitBlog(e)
{
    if (form.reportValidity())
    {
        e.preventDefault();
        let title = titleBox.value;
        let author = authorBox.value;
        let date = new Date();
        let profile = '../images/default.jpeg';
        let content = contentBox.value;

        titleBox.value = '';
        authorBox.value = '';
        contentBox.value = '';

        let blog = {title, author, date, profile, content};
        blog = JSON.stringify(blog);

        try{
            const response = await fetch(url, {
                method: 'POST', 
                headers: {"Content-Type":"application/json"},
                body: blog
            });
            if (!response.ok)
            {
                throw Error(`Error ${response.url} ${response.statusText}`);
            }
            blog = await response.json();
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