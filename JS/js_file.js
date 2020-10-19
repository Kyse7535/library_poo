class Book {
    constructor(title, author, nbre_page, read) {
        this.title = title;
        this.author = author;
        this.nbre_page = nbre_page;
        this.read = read;
    }

    info() {
        if (read == "yes") {
            return (
                "The" + this.title + " by " + author + ", " + this.nbre_page + " read yet"
            );
        } else {
            return (
                "The" +
                this.title +
                " by " +
                author +
                ", " +
                this.nbre_page +
                " not read yet"
            );
        }
    }
}
const myLibrary = (() => {
    let library = [];


    const afficher = () => {
        let table = document.getElementById("library");
        table.textContent = "";
        for (book in library) {
            let tr = document.createElement("tr");
            myBook = library[book];
            for (attr in myBook) {
                if (!isFunction(myBook[attr])) {
                    let td = document.createElement("td");
                    td.textContent = String(myBook[attr]);
                    td.style.cssText = "text-align:center;";
                    tr.append(td);
                }
            }
            create_button_delete(book, tr, table);
            create_button_read(book, tr, table);
        }
        change_read_status();
        remove_book();
    }

    const addBookToLibrary = (book) => {
        library.push(book);
    }

    const isFunction = (variableToCheck) => {
        //If our variable is an instance of "Function"
        if (variableToCheck instanceof Function) {
            return true;
        }
        return false;
    }



    const addBookToTable = () => {
        let btn_submit = document.getElementById("btn_submit");
        btn_submit.addEventListener('click', function() {
            let title = document.getElementById("title").value;
            let author = document.getElementById("author").value;
            let page = document.getElementById("page").value;
            let read = document.getElementById("read").value;

            let new_book = new Book(title, author, page, read);

            addBookToLibrary(new_book);
            afficher();
        });
    }

    const Toggle_display_form = () => {
        let formulaire = document.getElementById("myDIV");
        let btn_add = document.getElementById('btn_add');
        formulaire.style.display = "none";
        btn_add.addEventListener('click', function() {

            if (formulaire.style.display === "none") {
                formulaire.style.display = "block";
            } else {
                formulaire.style.display = "none";
            }
        });
    }

    const remove_book = () => {
        let btn_delete = document.getElementsByClassName("btn_delete");
        btn_delete = Array.from(btn_delete);
        btn_delete.forEach(btn_delete => {
            btn_delete.addEventListener('click', function() {
                let id = btn_delete.getAttribute("id");
                library.splice(id, 1);
                afficher();
            });
        });
    }

    const create_button_delete = (index, line, table) => {
        let td_button = document.createElement('td');
        td_button.innerHTML = "<button> Supprimer</button>";
        td_button.setAttribute("id", index);
        td_button.classList.add("btn_delete");
        line.append(td_button);
        table.append(line);
    }

    const create_button_read = (index, line, table) => {
        let td = document.createElement("td");
        td.innerHTML = "<button> (not)read</button>";
        td.classList.add("btn_read");
        td.setAttribute("id", index);
        line.append(td);
        table.append(line);
    }
    const change_read_status = () => {
        let btn_read = document.getElementsByClassName('btn_read');
        btn_read = Array.from(btn_read);
        btn_read.forEach(btn_read => {
            btn_read.addEventListener('click', function() {
                let id = btn_read.getAttribute('id');
                if (library[id]["read"] === "yes") {
                    library[id]["read"] = "no";
                } else {
                    library[id]["read"] = "yes";
                }
                afficher();
            });
        });
    }

    return { afficher, Toggle_display_form, addBookToTable }

})();

myLibrary.afficher();
myLibrary.Toggle_display_form();
myLibrary.addBookToTable();