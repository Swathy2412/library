const bookData = [
    {
        title: "Technical interview",
        author: "author1",
        publish_date: "2010-03-03",
        category: ['C++', 'ds']
    },
    {
        title: "Data structure",
        author: "author1",
        publish_date: "1999-11-03",
        category: ['C++', 'ds', 'algorithm']
    },
    {
        title: "DBMS",
        author: "author2",
        publish_date: "1999-11-04",
        category: ['sql', 'nosql']
    },
    {
        title: "C Programming",
        author: "Allan",
        publish_date: "1999-10-06",
        category: ['C', 'algorithm']
    },
    {
        title: "HTML5",
        author: "Matthew",
        publish_date: "1999-10-10",
        category: ['html', 'css']
    },
    {
        title: "Android App",
        author: "Allan",
        publish_date: "1999-10-04",
        category: ['java', 'python']
    },
    {
        title: "C++ Programming",
        author: "Mathew",
        publish_date: "1999-12-04",
        category: ['C++', 'algorithm']
    },   
    {
        title: "Basic Java",
        author: "author2",
        publish_date: "2000-10-04",
        category: ['C++', 'ds', 'algorithm']
    },
    {
        title: "UNIX",
        author: "author2",
        publish_date: "1999-11-14",
        category: ['OS']
    },
    {
        title: "Web Design",
        author: "Bretto",
        publish_date: "1999-10-24",
        category: ['html', 'css', 'javascript']
    },
    {
        title: "javascript functions",
        author: "author2",
        publish_date: "1999-10-04",
        category: ['js', 'react']
    },
    {
        title: "LINUX",
        author: "author3",
        publish_date: "1999-12-07",
        category:['os']
    },
    {
        title: "Big data",
        author: "author2",
        publish_date: "1999-11-24",
        category: ['hadoop','hive']
    },
    {
        title: "Ubuntu",
        author: "author3",
        publish_date: "1999-01-05",
        category: ['OS']
    },
    {
        title: "Information Security",
        author: "author1",
        publish_date: "1999-10-04",
        category: ['attacks', 'threats']},
    {
        title: "Windows 8",
        author: "author2",
        publish_date: "1999-06-01",
        category: ['Os']
    },
    {
        title: "Problem Solving",
        author: "author1",
        publish_date: "2000-11-24",
        category: ['C++', 'C', 'algorithm']
    },
    {
        title: "Build with Php",
        author: "author2",
        publish_date: "1999-05-06",
        category: ['php']
    },
    {
        title: "Social media",
        author: "author1",
        publish_date: "1999-03-04",
        category: ['Facebook', 'Twitter']
    },
    {
        title: "Machine Learning",
        author: "author2",
        publish_date: "2002-11-18",
        category: ['problem', 'algorithm']
    },
    {
        title: "Deep Learning",
        author: "author3",
        publish_date: "1999-12-04",
        category: ['problem', 'algorithm']
    },
    {
        title: "OOPS",
        author: "author2",
        publish_date: "2001-09-06",
        category: ['java',  'algorithm']
    },
];

let filterList = [];

function loadBook(bookData, startIndex){
    console.log(bookData)
    let books = document.querySelector(".books");
    books.innerHTML = '';
    console.log(startIndex);
    for(let i=startIndex; i<startIndex+10; i++){
        console.log(bookData.length, i)
        if(i>=bookData.length){
            console.log('he')
            break;
        }
        const book = bookData[i];
        console.log(book);
        const bookTemplate = `<div class="book">
                                <h1 class="book-title">${book.title}</h1>
                                <div class="book-author book-flex">
                                    <h3>Author:</h3>
                                    <span>${book.author}</span>
                                </div>
                                <div class="book-category">
                                    <h3>Category</h3>
                                    <div class="category-list">
                                        ${generateCategoryList(book.category)}
                                    </div>
                                </div>
                                <div class="book-publish book-flex">
                                    <h3>Publish Date:</h3>
                                    <span>${book.publish_date}</span>
                                </div>
                            </div>`;
        books.innerHTML += bookTemplate;
    }
}

function generateCategoryList(category){
    let categoryTemplate = ''
    category.forEach(each => {
        categoryTemplate += `<div class="category">${each}</div>`;
    });
    return categoryTemplate;
}

function loadTotalPages(bookCount){
    console.log(bookCount);
    const pages = document.querySelector(".pages");
    pages.innerHTML = '';

    if(bookCount % 10 === 0){
        bookCount = Math.floor(bookCount/10) - 1; 
    }
    else{
        bookCount = Math.floor(bookCount / 10);
    }
    for(let i=0; i<=bookCount; i++){
        pages.innerHTML += `<div class="page">${i+1}</div>`;
    }
    document.querySelectorAll(".pages .page").forEach(page => {
        page.addEventListener('click', (e) => {
            const pageNo = +e.target.innerText;
            console.log(filterList);
            if(!filterList.length){
                console.log('here');
                loadBook(bookData, pageNo*10-10);
            }
            else{
                loadBook(filterList, pageNo*10-10)
            }
            console.log(pageNo);
        });
    });
}

const bookCountCnt = document.querySelector('.book-count span');

let searchFilter = 'title';
const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector(".search-btn");
const searchReset = document.querySelector(".search-reset");
const filterOption = document.querySelector("#filter");
const searchInp = document.querySelector("#search-inp");
const searchDate = document.querySelector("#search-inp-date");

filterOption.addEventListener("input", (e) => {
    if(e.target.value === "publish_date"){
        searchInp.classList.add('none');
        searchDate.classList.remove('none');
    }
    else{
        searchInp.classList.remove('none');
        searchDate.classList.add('none');
    }
    searchFilter = e.target.value;
});

searchForm.addEventListener('submit', searchBook);
searchBtn.addEventListener('click', searchBook);
searchReset.addEventListener('click', () => {
    filterList=[];
    loadInitialPage();
});

function searchBook(e){
    e.preventDefault();
    filterList=[];
    const inpValue = searchFilter === 'publish_date' ? searchDate.value : searchInp.value;
    bookData.forEach(book => {
        if(book[searchFilter] === inpValue){
            filterList.push(book);
        }
    });
    loadBook(filterList, 0);
    loadTotalPages(filterList.length);
    bookCountCnt.innerText = filterList.length;
}

function loadInitialPage(){
    loadBook(bookData, 0);
    loadTotalPages(bookData.length);
    bookCountCnt.innerText = bookData.length;
}

loadInitialPage();