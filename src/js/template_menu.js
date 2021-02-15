export default (categories) => {
    
// let template = '';
//     for (let i = 0; i < categories.length; i++) {
//         template += `<nav class="nav d-flex justify-content-between">
//                         <a class="p-2 text-muted" href="#">${categories[i].name}</a>
//                     </nav>       
//         `      
//         }
    
//   return template;
let template = `
                <nav class="nav d-flex justify-content-between">
                    <a class="p-2 text-muted" href="#" data-id="${categories.id}">${categories.name}</a>
                </nav> 
                `
return template;
}