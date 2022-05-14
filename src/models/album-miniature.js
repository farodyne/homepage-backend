/**
 * Author: Federico Engler
 *
 * A model class used for representing an album miniature in a section of albums.
 */
import { environment } from '../utils';

class AlbumMiniature {
    /**
     * Creates a frontend model instance of an album miniature.
     * @param {Object} album - The database representation for the album.
     */
    constructor(album) {
        this.id = album.id;
        this.type = album.type;
        this.caption = album.caption;
        this.url = `${environment.contentUrl}/${album.type}/${album.id}/thumbnail.jpg`;
    }
}

export default AlbumMiniature;
