
var Item = function Item(imagen){
    this.image = imagen;
    this.price = 0.00;
    this.name = "Zapato";
};

// Get random price in range min, max
Item.prototype.getPrice = function(){
    var min = 100;
    var max = 1000;
    return (Math.random() * (max - min) + min).toFixed(2);
}

exports.Item = Item;