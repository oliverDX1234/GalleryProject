export default {
    namespaced: true,
    state(){

        return {
            selectedDetailedItem: JSON.parse(localStorage.getItem('selectedDetailedItem')) || null,
            albums:JSON.parse(localStorage.getItem('albums')) || []
        }
    },
    getters:{
        selectedDetailedItem(state){
            return state.selectedDetailedItem;
        },

        allAlbums(state){
            return state.albums;
        }
    },
    actions:{
        setNewItem(context, payload){
            context.commit("SET_NEW_ITEM", payload);
        },

        addNewAlbum(context, payload){

            if(context.getters.allAlbums.some(x => x.name === payload.name)){
                throw new Error("Duplicate album name")
            }

            let album = {
                name: payload.name,
                id: payload.id,
                items: [payload.item],
                upload_date: payload.upload_date
            }

            context.commit("ADD_NEW_ALBUM", album);
        },

        addInAlbum(context, payload){

            context.commit("ADD_IN_ALBUM", payload);
        },

        deleteItem(context, payload){
            context.commit("DELETE_ITEM", payload);
        }
    },

    mutations:{
        SET_NEW_ITEM(state, payload){
            state.selectedDetailedItem = payload;

            localStorage.setItem("selectedDetailedItem", JSON.stringify(payload));
        },
        ADD_NEW_ALBUM(state, payload){
            state.albums.push(payload);

            localStorage.setItem("albums", JSON.stringify(state.albums));
        },
        ADD_IN_ALBUM(state, payload){
            let index = state.albums.findIndex(x => x.name === payload.name);

            if(index !== -1){
                state.albums[index].items.push(payload.item);

                localStorage.removeItem("albums");
                localStorage.setItem("albums", JSON.stringify(state.albums));
            }else{
                throw new Error("There was an error");
            }
        },

        DELETE_ITEM(state, payload){
            let index = state.albums.findIndex(x => x.id === Number(payload.in));

            if(index !== -1){
                let itemIndex = state.albums[index].items.findIndex( item => item.id === payload.item.id)

                if(itemIndex !== -1){
                    state.albums[index].items.splice(itemIndex, 1);

                    localStorage.removeItem("albums");
                    localStorage.setItem("albums", JSON.stringify(state.albums));
                }

            }else{
                throw new Error("There was an error");
            }
        }
    }
}
