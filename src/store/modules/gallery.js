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
                items: [payload.item]
            }

            context.commit("ADD_NEW_ALBUM", album);
        },

        addInAlbum(context, payload){

            context.commit("ADD_IN_ALBUM", payload);
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
            }else{
                throw new Error("There was an error");
            }
        }
    }
}
