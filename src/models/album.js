/**
 * Author: Federico Engler
 *
 * A model class used for representing an album in our hierarchy of images.
 */
import { settings } from '../utils';

class Album {
    constructor(id, type, caption) {
        this.id = id;
        this.type = type;
        this.caption = caption;
        this.images = [];
        this.path = `${settings.contentUrl}/${type}/${id}`;
    }
}
