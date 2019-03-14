var main = new Vue({
    el: "#main",
    data: {
        books: [],
    },
    created() {
        this.startFetchingAsync("https://api.myjson.com/bins/zyv02");
        this.loader();
    },
    methods: {
        startFetchingAsync(url) {
            fetch(url, {
                method: "GET",
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                data = json;
                main.books = data.books;

                for (var i = 0; i < main.books.length; i++) {
                    main.createBookCard(main.books[i]);
                }

            }).catch(function (error) {
                console.log(error);
            })
        },
        createBookCard(book) {
            var cardElement = document.getElementById("animatedBooks");

            var flip = document.createElement("div");
            flip.className = "flippingProcess";

            var frontPage = document.createElement("div");
            frontPage.className = "frontPage";

            var backPage = document.createElement("div");
            backPage.className = "backPage";

            var displayName = document.createElement("h5");
            displayName.className = "displayName";
            displayName.innerHTML = book.title;

            var displayPicture = document.createElement("img");
            displayPicture.className = "displayPicture";
            displayPicture.setAttribute("src", book.cover);

            frontPage.append(displayPicture);


            backPage.append(displayName, book.description);

            var infoButton = document.createElement("button");
            infoButton.className = "infoButton";
            infoButton.innerHTML = "More info";
            infoButton.setAttribute("data-fancybox", "group");
            infoButton.setAttribute("href", book.detail);

            backPage.append(infoButton);
            flip.append(frontPage, backPage);
            cardElement.append(flip);
        },
        loader() {
            setTimeout(this.showPage, 1000);
        },
        showPage() {
            document.getElementById("loader").style.display = "none";
            document.getElementById("myDiv").style.display = "block";
        }
    }
});
