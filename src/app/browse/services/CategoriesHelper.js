/**
 * Ruflix - Rutracker.org client
 * Copyright (C) 2017 Dmitrij Rysanow
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Created by TheCyberd3m0n (thecyberd3m0n@gmail.com) on 21.09.17.
 *
 */
import categories from '../const/categories.json';
import _ from 'lodash';

export default function ($translate) {
    let catJson = categories;
    let currentLanguage = _.find(catJson.LANGUAGES, (x) => x.tag === $translate.use());
    console.log('currentLanguage', currentLanguage);

    /**
     * Returns category or forum translated to current language
     * @param entity
     * @return entity
     */
    function translateEntity(entity) {
        console.log('translating entity', entity);
        let translation = catJson.TRANSLATIONS.find((x) => x.id === entity.transID);
        if (!translation) return entity;
        let ts = translation.translations.find((x) => x.langID === currentLanguage.id);
        entity.name = ts.text;
        return entity;
    }

    return {
        getCategoriesInGroup: function (id) {
            let entities = _.filter(catJson.CATEGORIES, (x) => x.groupID === id);
            let result = entities.map((entity) => {
                let translated = entity;
                if (entity.forums) {
                    translated.forums = entity.forums.map((y) => {
                        y.subforms = y.subforums.map(translateEntity);
                        return translateEntity(y);
                    });
                }
                return translateEntity(translated);
            });
            return result;
        }
    }
}