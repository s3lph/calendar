/**
 * @copyright Copyright (c) 2019 Georg Ehrke
 *
 * @author Georg Ehrke <oc.list@georgehrke.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 *
 * @param {Object} store The Vuex store
 * @param {Object} router The Vue router
 * @returns {Function}
 */
export default function(store, router) {
	return function({ start, end, allDay }) {
		const name = store.state.settings.showPopover
			? 'NewPopoverView'
			: 'NewSidebarView'
		const params = Object.assign({}, store.state.route.params, {
			allDay: allDay ? '1' : '0',
			dtstart: String(Math.floor(start.getTime() / 1000)),
			dtend: String(Math.floor(end.getTime() / 1000)),
		})

		// Don't push new route when day didn't change
		if (name === store.state.route.name
			&& params.allDay === store.state.route.params.allDay
			&& params.dtstart === store.state.route.params.dtstart
			&& params.dtend === store.state.route.params.dtend) {
			return
		}

		router.push({ name, params })
	}
}
