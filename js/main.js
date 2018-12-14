var main = new Vue({
    el: "#main",
    data: {
        books: [],
    },
    created() {
        this.startFetchingAsync("https://api.myjson.com/bins/zyv02");
    },
    methods: {
        startFetchingAsync(url) {
            fetch(url, {
                method: "GET",
                // compare the reponse to json
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                data = json;
                main.books = data.books;
                console.log(main.books);

                console.log(main.books.length);

                for (var i = 0; i < main.books.length; i++) {
                    main.createBookCard(main.books[i]);
                }

                console.log(1);
            }).catch(function (error) {
                console.log(error);
            })
        },
        createBookCard(book) {
            console.log(2);
            var cardElement = document.getElementById("animatedBooks");

            var flip = document.createElement("div");
            flip.className = "flippingProcess";

            var frontPage = document.createElement("div");
            frontPage.className = "frontPage";

            var backPage = document.createElement("div");
            backPage.className = "backPage";

            var displayPicture = document.createElement("img");
            displayPicture.className = "displayPicture";
            displayPicture.setAttribute("src", book.cover);

            frontPage.append(displayPicture);

            backPage.innerHTML = book.description;

            var infoButton = document.createElement("button");
            infoButton.className = "infoButton";
            infoButton.innerHTML = "More info";
            infoButton.setAttribute("data-fancybox", "group");
            infoButton.setAttribute("href", book.detail);

            backPage.append(infoButton);
            flip.append(frontPage, backPage);
            cardElement.append(flip);
        }
    }
});