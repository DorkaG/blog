import '../css/style.css';
import App from './app';

console.log('Čistá šablona projektu');

let posts = document.querySelector('.page');

let app = new App (posts);

app.run();
