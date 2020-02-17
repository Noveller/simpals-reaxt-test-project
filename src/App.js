import React, {Fragment, useEffect, useState} from 'react';
import './App.css';
import api from './api/posts'
import posts from './db/posts';
import Post from './post';
import Form from "./form";

api.init(posts);

function App() {
    const [posts, setPosts] = useState([]);

    const updatePosts = (posts) => {
        setPosts(posts.filter(post => post.visible))
    };

    const removePost = (post) => {
        api.removePost(post);

        updatePosts(api.getAllPosts());
    };

    const createPost = (post) => {
      api.addPost({
          ...post,
          tags: post.tags.split(',').map(item => item.trim())
      });

      updatePosts(api.getAllPosts());
    };

    useEffect(() => {
        updatePosts(api.getAllPosts());
    }, []);

    return (
        <Fragment>
            <div className="container">

                <header id="header">
                    <div className="page-header">
                        <h1>Тестовое задание</h1>
                    </div>
                    <h2>Задача:</h2>
                    <ol>
                        <li>Используя коллекцию <code>json/posts.json</code> заполнить базовыми
                            значениями <code>localStorage</code> пользователя, вывести записи в <code>#posts</code>,
                            взяв за
                            основу разметку <code>#posts article</code>.
                        </li>
                        <li>Возможность удаления записи из <code>localStorage</code>.</li>
                        <li>Форма добавления записи, валидация данных.</li>
                    </ol>
                    <p className="alert alert-info">Ограничений по использованию библиотек,
                        кроссбраузерности &mdash; нет.</p>
                </header>

                <section>

                    { !!posts.length && (
                        <div id="posts" className="bg-secondary p-3 rounded">
                            { posts.map((post, index) => <Post key={`post-${index}`} post={post} remove={removePost} />) }
                        </div>
                    )}

                    <Form onSubmit={createPost}/>

                </section>

            </div>
        </Fragment>
    );
}

export default App;
