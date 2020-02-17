import React from 'react';

function Post({ post, remove }) {
    const { id, title, body, tags } = post;

    return (
        <article>
            <header>
                <h3>{id}</h3>
                <h3>{title}</h3>
            </header>
            <section>
                <p>{body}</p>
            </section>
            <footer>
                <div className="tags">
                    {tags.map((tag, index) => <button key={`${tag}-${index}`} className="btn btn-light mr-2">{tag}</button>)}
                </div>
            </footer>
            <div className="controls">
                <button className="btn btn-danger btn-mini" onClick={() => remove(post)}>удалить</button>
            </div>
        </article>
    )
}

export default Post;