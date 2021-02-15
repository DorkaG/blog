export default(post) => {
    let template = `
    <h2 class="blog-post-title">${post.title}</h2>
        <p class="blog-post-meta">${post.date} by <a href="#">${post.author}</a></p>
        <div>${post.content}</div>
        <div class="likes"> likes: ${post.likes} <button data-id="${post.id}"> Like </button></div>
    `

    return template;
}