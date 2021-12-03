document.querySelector('.create-todo').addEventListener('click', function () {
    document.querySelector('.new-item').style.display = 'block';
});
document.querySelector('.new-item button').addEventListener('click', function () {
    var itemName = document.querySelector('.new-item input').value;
    if (itemName != '') {
        var itemStorage = localStorage.getItem('todo-items');
        var itemsArr = JSON.parse(itemStorage);
        itemsArr.push({ "item": itemName, "status": 0 });
        saveItems(itemsArr);
        fetchItems();
        document.querySelector('.new-item').style.display = "none";
    }
});




// const items = [{ "item": "Record next video", "status": 0 },
// { "item": "Record next video", "status": 0 }];


function fetchItems() {


    const itemsList = document.querySelector('ul.todo-items')
    itemsList.innerHTML = '';
    var newItem = '';
    try {
        var itemStorage = localStorage.getItem('todo-items');
        var itemsArr = JSON.parse(itemStorage);

        for (var i = 0; i < itemsArr.length; i++) {
            var status;
            if (itemsArr[i].status == 1) {
                status = 'class = "done"';
            }
            newItem += `<li data-itemindex = "${i}" ${status}>
                  <span class="item">${itemsArr[i].item}</span>
                <div><span class="itemComplete">✅</span><span class="itemDelete">❌</span></div>
            </li>`;


        }
        itemsList.innerHTML = newItemHTML;
        var itemsListUL = document.querySelector('ul li');
        for (var i = 0; i < itemsListUL.length; i++) {

            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function () {

                var index = this.parentNode.parentNode.dataset.itemindex;
                itemComplete(index);
            });
            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function () {
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemDelete(index);
            });
        }
    }
    catch (e) {
        // create default
    }
}


function itemDelete(index) {

    var itemStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemStorage);
    itemsArr.splice(index, 1);
    saveItems(itemsArr);

    document.querySelector('ul.tod-items li[data-itemindex="' + index + '"]').remove;


}
function itemComplete(index) {


    var itemStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemStorage);

    itemsArr[index].status = 1;

    saveItems(itemsArr);
    document.querySelector('ul.tod-items li[data-itemindex="' + index + '"]').className = 'done';
}


function saveItems(obj) {

    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}
fetchItems();