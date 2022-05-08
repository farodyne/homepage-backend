/**
 * Author: Federico Engler
 *
 * A model class used for representing an album in our hierarchy of images.
 */
import { settings } from '../utils';

class Album {
    /**
     * Creates a frontend model instance of an album.
     * @param {Object} album - The database representation for the album.
     */
    constructor(album) {
        this.id = album.id;
        this.type = album.type;
        this.caption = album.caption;
        this.height = album.height || 850;
        this.width = album.width || 1275;

        this.images = album.images.map((image) => {
            return {
                caption: image.caption,
                url: `${settings.contentUrl}/${album.type}/${album.id}/${image.id}.jpg`
            };
        });
    }
}

export default Album;
