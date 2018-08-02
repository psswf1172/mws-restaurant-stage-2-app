'use strict';

class IDBHelper {

  static createDB() {
		if (!('indexedDB' in window)) {
			console.log('This browswer does not support IndexedDB');
			return;
		}

		return idb.open('restaurants', 1, upgradeDB => {
			let restaurantStore = upgradeDB.createObjectStore('restaurants', { keyPath: 'id' });
			restaurantStore.createIndex('by-neighborhood', 'neighborhood');
			restaurantStore.createIndex('by-cuisine', 'cuisine');
		});
	}

	static addToDB(restaurant) {
		dbPromise.then(db => {
			let tx = db.transaction('restaurants', 'readwrite');
			let restaurantStore = tx.objectStore('restaurants');
			restaurantStore.put(restaurant);
			return tx.complete;
		})
	};

	static getFromDB() {
		dbPromise.then(db => {
			let tx = db.transaction('restaurants', 'readonly');
			let restaurantStore = tx.objectStore('restaurants');
			return restaurantStore.getAll();
			return tx.complete;
		});
	}

}
const dbPromise = IDBHelper.createDB();