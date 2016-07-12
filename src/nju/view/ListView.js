import View from "./View";

export default class ListView extends View
{
    init()
    {
        super.init();
        this._items = null;
        this._$itemTemplates = [];
        this.addStyleClass("nju-list-view");
    }

    getElementTag()
    {
        return "ul";
    }

    get items()
    {
        return this._items;
    }

    set items(value)
    {
        this.clearItems();
        this.addItems(value);
    }

    getTypeOfItem(item)
    {
        return 0;
    }

    clearItems()
    {
        if (this._items !== null)
        {
            if(this._items.length > 0)
            {
                this._items.splice(0, this._items.length);
                this.$element.children("li").remove();
            }
        }
        else
        {
            this._items = [];
        }
    }

    addItems(items)
    {
        if (items && items.length)
        {
            items.forEach(item => {
                this.addItem(item);
            });
        }
    }

    addItem(item)
    {
        this.items.push(item);

        const $li = this.$createItem(this.getTypeOfItem(item));
        this.renderItem(item, $li);
        this.$element.append($li);
    }

    renderItem(item, $li)
    {

    }

    $createItem(itemType = 0)
    {
        if (!this._$itemTemplates[itemType])
        {
            this._$itemTemplates[itemType] = this.$createNewItem(itemType);
        }
        return this._$itemTemplates[itemType].clone();
    }


    $createNewItem(itemType = 0)
    {
        return $("<li/>");
    }
}
