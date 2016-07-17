import ListView from "../../nju/view/ListView";

export default class PlayListView extends ListView
{
    init()
    {
        super.init();
        this.addStyleClass("nm-play-list-view");
    }

    // set selectedId(value)
    // {
    //     if (value ! == "search")
    //     {
    //
    //     }
    //     else
    //     {
    //
    //     }
    // }

    $createNewItem()
    {
        const $li = super.$createNewItem();
        $li.append(`
            <span class="icon iconfont icon-playlist"></span>
            <span class="text"></span>
        `);
        return $li;
    }

    renderItem(item, $li)
    {
        super.renderItem(item, $li);
        $li.children(".text").text(item.name);
    }

}
