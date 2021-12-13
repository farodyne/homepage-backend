/**
 * Author: Federico Engler
 *
 * A model class used for representing a section of albums. In our case the
 * sections are the sections for trips, fantasy images or the misc pictures.
 */
import { AlbumMiniature } from '.';

class Section {
    /**
     * Creates a frontend model instance for a section of albums.
     * @param {Array} section - The array of albums in the section.
     */
    constructor(section) {
        this.albums = [];

        if (section) {
            section.forEach((album) => {
                this.albums.push(new AlbumMiniature(album));
            });
        }
    }
}

export default Section;
