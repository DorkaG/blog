export default (post) => {
    let template = `
        <div class="col-md-6 px-0">
            <h1 class="display-4 font-italic">${post.title}</h1>
            <p class="lead my-3">${post.perex}</p>
            <p class="lead mb-0"><a href="#" class="text-white font-weight-bold" data-id="${post.id}">Continue reading...</a></p>
        </div>
    
    `

    return template;

}