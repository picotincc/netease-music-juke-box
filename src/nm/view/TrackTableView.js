import TableView from "../../nju/view/TableView";

export default class TrackTableView extends TableView
{
    init()
    {
        super.init();
        this.addStyleClass("nm-track-table-view");
    }


    $createNewItem(itemType = 0)
    {
        const $tr = super.$createNewItem();
        $tr.append(`
                <td class="name"></td>
                <td class="artists"></td>
                <td class="album"></td>`);
        return $tr;
    }


    renderItem(item, $item)
    {
        super.renderItem(item, $item);
        $item.children(".name").text(item.name);
        $item.children(".artists").text(item.artists.map(artist => artist.name).join("， "));
        $item.children(".album").text(item.album.name);
    }

    renderHeadItem($headItem)
    {
        super.renderHeadItem($headItem);
        this.renderItem({
            name: "音乐标题",
            artists: [{name:"歌手"}],
            album: { name:"专辑"}
        }, $headItem);
    }


}
