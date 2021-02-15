export default class {
    constructor(title, author, date, perex, content, image, category, special, likes, id) {
        this._title = title;
        this._author = author;
        this._date = date; 
        this._perex = perex;
        this._content = content;
        this._image = image;
        this._category = category;
        this._special = special;
        this._likes = likes;
        this._id = id;
    }

    get title() { return this._title }
    get author() { return this._author }
    get date() { return this._date }
    get perex() { return this._perex }
    get content() { return this._content }
    get image() { return this._image }
    get category() { return this._category }
    get special() { return this._special }
    get likes() { return this._likes }
    get id() { return this._id }
}