const favorites = {
    winter : [
        {
            bookTitle : 'The Book Eaters',
            autor : 'By Sunyi Dean',
            bookDescription : 'An unusual sci-fi story about a book eater woman who tries desperately to save her dangerous mind-eater son from tradition and certain death. Complete with dysfunctional family values, light Sapphic romance, and a strong, complex protagonist. Not for the faint of heart.',
            bookImage : ''
        },
        {
            bookTitle : 'Cackle',
            autor : 'By Rachel Harrison',
            bookDescription : 'Are your Halloween movies of choice The Witches of Eastwick and Practical Magic? Look no further than here - where a woman recovering from a breakup moves to a quaint town in upstate New York and befriends a beautiful witch.',
            bookImage : ''
        },
        {
            bookTitle : 'Dante: Poet of the Secular World',
            autor : 'By Erich Auerbach',
            bookDescription : "Auerbach's engaging book places the 'Comedy' within the tradition of epic, tragedy, and philosophy in general, arguing for Dante's uniqueness as one who raised the individual and his drama of soul into something of divine significance—an inspired introduction to Dante's main themes.",
            bookImage : ''
        },
        {
            bookTitle : 'The Last Queen',
            autor : 'By Clive Irving',
            bookDescription : 'A timely and revelatory new biography of Queen Elizabeth (and her family) exploring how the Windsors have evolved and thrived as the modern world has changed around them.',
            bookImage : ''
        }
    ],
    spring : [
        {
            bookTitle : 'The Body',
            autor : 'By Stephen King',
            bookDescription : 'Powerful novel that takes you back to a nostalgic time, exploring both the beauty and danger and loss of innocence that is youth.',
            bookImage : ''
        },
        {
            bookTitle : 'Carry: A Memoir of Survival on Stolen Land',
            autor : 'By Toni Jenson',
            bookDescription : "This memoir about the author's relationship with gun violence feels both expansive and intimate, resulting in a lyrical indictment of the way things are.",
            bookImage : ''
        },
        {
            bookTitle : 'Days of Distraction',
            autor : 'By Alexandra Chang',
            bookDescription : "A sardonic view of Silicon Valley culture, a meditation on race, and a journal of displacement and belonging, all in one form-defying package of spare prose.",
            bookImage : ''
        },
        {
            bookTitle : 'Dominicana',
            autor : 'By Angie Cruz',
            bookDescription : 'A fascinating story of a teenage girl who marries a man twice her age with the promise to bring her to America. Her marriage is an opportunity for her family to eventually immigrate. For fans of Isabel Allende and Julia Alvarez.',
            bookImage : ''
        }
    ],
    summer : [
        {
            bookTitle : 'Crude: A Memoir',
            autor : 'By Pablo Fajardo & ​​Sophie Tardy-Joubert',
            bookDescription : 'Drawing and color by Damien Roudeau | This book illustrates the struggles of a group of indigenous Ecuadoreans as they try to sue the ChevronTexaco company for damage their oil fields did to the Amazon and her people',
            bookImage : ''
        },
        {
            bookTitle : 'Let My People Go Surfing',
            autor : 'By Yvon Chouinard',
            bookDescription : "Chouinard—climber, businessman, environmentalist—shares tales of courage and persistence from his experience of founding and leading Patagonia, Inc. Full title: Let My People Go Surfing: The Education of a Reluctant Businessman, Including 10 More Years of Business Unusual.",
            bookImage : ''
        },
        {
            bookTitle : 'The Octopus Museum: Poems',
            autor : 'By Brenda Shaughnessy',
            bookDescription : "This collection of bold and scathingly beautiful feminist poems imagines what comes after our current age of environmental destruction, racism, sexism, and divisive politics.",
            bookImage : ''
        },
        {
            bookTitle : 'Shark Dialogues: A Novel',
            autor : 'By Kiana Davenport',
            bookDescription : "An epic saga of seven generations of one family encompasses the tumultuous history of Hawaii as a Hawaiian woman gathers her four granddaughters together in an erotic tale of villains and dreamers, queens and revolutionaries, lepers and healers.",
            bookImage : ''
        }
    ],
    autumn : [
        {
            bookTitle : 'Casual Conversation',
            autor : 'By Renia White',
            bookDescription : "White's impressive debut collection takes readers through and beyond the concepts of conversation and the casual - both what we say to each other and what we don't, examining the possibilities around how we construct and communicate identity.",
            bookImage : ''
        },
        {
            bookTitle : 'The Great Fire',
            autor : 'By Lou Ureneck',
            bookDescription : "The harrowing story of an ordinary American and a principled Naval officer who, horrified by the burning of Smyrna, led an extraordinary rescue effort that saved a quarter of a million refugees from the Armenian Genocide",
            bookImage : ''
        },
        {
            bookTitle : 'Rickey: The Life and Legend',
            autor : 'By Howard Bryant',
            bookDescription : "With the fall rolling around, one can't help but think of baseball's postseason coming up! And what better way to prepare for it than reading the biography of one of the game's all-time greatest performers, the Man of Steal, Rickey Henderson?",
            bookImage : ''
        },
        {
            bookTitle : 'Slug: And Other Stories',
            autor : 'By Megan Milks',
            bookDescription : "Exes Tegan and Sara find themselves chained together by hairballs of codependency. A father and child experience the shared trauma of giving birth to gods from their wounds.",
            bookImage : ''
        }
    ]

}
const bookTitles = document.querySelectorAll('.book-title');
const autors = document.querySelectorAll('.book-autor');
const bookDescriptions = document.querySelectorAll('.book-desc');
const bookImages = document.querySelectorAll('.book-image');
const radioButtons = document.querySelectorAll('.radio-button');
const favoritesContainer = document.querySelector('.favorites-list')
let changedSeason = 'winter';

for (const key in favorites) {
    favorites[key].forEach((item, index) => {
        item.bookImage = `url(./pictures/favorites/${key + (1 + index)}.jpg)` 
    });
}

function booksReplacement(season) {
    favoritesContainer.classList.add('opacity');
    favoritesContainer.addEventListener('transitionend', () => {
        favorites[season].forEach((item, index) => {
            bookTitles[index].innerHTML = item.bookTitle;
            autors[index].innerHTML = item.autor;
            bookDescriptions[index].innerHTML = item.bookDescription;
            bookImages[index].style.backgroundImage = item.bookImage;
            buttonsBuy[index].disabled = false;
            buttonsBuy[index].innerHTML = 'Buy';
            activeUser.books.forEach(book => {
                if (book.season === season && book.index === index) {
                    buttonsBuy[index].innerHTML = 'Own';
                    buttonsBuy[index].disabled = true;
                }
            })
        });
        favoritesContainer.classList.remove('opacity');
    });
}

function seasonSelection(event) {
    clearInterval(timerId);
    changedSeason = event.target.attributes[1].value;    
    booksReplacement(changedSeason);
}

radioButtons.forEach(item => {
    item.addEventListener('change', seasonSelection);
})

booksReplacement(changedSeason);

let i = 0;
let timerId = setInterval(() => {
        i = (i < 3) ? i + 1 : 0;
        booksReplacement(Object.keys(favorites)[i]);
        favoritesContainer.addEventListener('transitionend', () => {
            radioButtons[i].checked = true;
        }, {once: true});
}, 7000);