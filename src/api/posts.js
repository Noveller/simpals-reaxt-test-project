const setPosts = (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
};

export default {
    init(initialData) {
        const posts = localStorage.getItem('posts');
        !posts && localStorage.setItem('posts', JSON.stringify(initialData.map(post => {
            return {...post, visible: true}
        })));
    },
    getAllPosts() {
        const posts = JSON.parse(localStorage.getItem('posts'));

        if (!Array.isArray(posts)) return [];

        return posts;
    },
    removePost(post) {
        const posts = this.getAllPosts();

        localStorage.setItem('posts', JSON.stringify(posts.map(item => {
            if (item.id === post.id) {
                return { ...item, visible: false }
            }

            return item;
        })));
    },
    addPost(post) {
        const posts = this.getAllPosts();

        if (!posts.length) {
            setPosts([...posts, {...post, id: 1}]);
        } else {
            setPosts([...posts, { ...post, id: Math.max(...posts.map(item => item.id)) + 1, visible: true }]);
        }
    }
}