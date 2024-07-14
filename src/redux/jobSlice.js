import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    filteredJobs: [],
    initialized: false,
};

const jobSlice = createSlice({
    name: 'jobSlice',
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload;
            state.filteredJobs = action.payload;
            state.initialized = true;
        },

        addJob: (state, action) => {
            state.jobs.push(action.payload);
        },

        //!arama kısmı
        filterBySearch: (state, action) => {
            // arama terimini küçük harfe çevirme (aA duyarlılığı ortadan kaldırmak için)
            const query = action.payload.toLowerCase();

            //  aksiyonla gelen arama terimiyle eşeleşen objelerl yeni bir dizi oluştur
            const filtered = state.jobs.filter((job) =>
                job.company.toLowerCase().includes(query)
            );
            //!store güncelleme
            state.filteredJobs = filtered;
        },

        //!durum kısmı
        filterByStatus: (state, action) => {
            state.filteredJobs = state.jobs.filter(
                (job) => job.status === action.payload
            );
        },

    //!tip kısmı
        filterByType: (state, action) => {
            state.filteredJobs = state.jobs.filter(
                (job) => job.type === action.payload
            );
        },
  //! sıralama selecti değiştiğinde çalışır
        sortJobs: (state, action) => {
            switch (action.payload) {
              case 'a-z':
                state.filteredJobs.sort((a, b) => {
                  // eğerki a objesinin şirket ismi alfabede sıra olarak
                  // b'den gerideyse a objesini b'ye göre daha ön sıraya koy
                  // ! sort dizideki bütün elemanlar için bu sorguyu gerçekleştitir
                  if (a.company < b.company) return -1;
                  if (a.company > b.company) return 1;
                  return 0;
                });
                break;
              case 'z-a':
                state.filteredJobs.sort((a, b) => {
                  // eğerki a objesinin şirket ismi alfabede sıra olarak
                  // b'den gerideyse a objesini b'ye göre daha ön sıraya koy
                  // ! sort dizideki bütün elemanlar için bu sorguyu gerçekleştitir
                  if (a.company < b.company) return 1;
                  if (a.company > b.company) return -1;
                  return 0;
                });
      
              case 'En Yeni':
                state.filteredJobs.sort(
                  (a, b) => new Date(b.date) - new Date(a.date)
                );
                break;
      
              case 'En Eski':
                state.filteredJobs.sort(
                  (a, b) => new Date(a.date) - new Date(b.date)
                );
      
              default:
                break;
            }
      
            return state;
          },

     //! Filtreleri temizleme buttonu
     clearFilter : (state) => {
     state.filteredJobs = state.jobs;
     }
      
    },
});

export const { 
    setJobs, 
    addJob, 
    filterBySearch, 
    filterByStatus, 
    filterByType, 
    sortJobs, 
    clearFilter,
} = jobSlice.actions;

export default jobSlice.reducer;
