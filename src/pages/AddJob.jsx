import { statusOptions,typeOptions } from "../constants";
import {v4} from "uuid";
import { addJob } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJob = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
  const handleSubmit= (e) =>{
    e.preventDefault();
   //! formun son halini vererek bir form verisi oluşturma
   const formData = new FormData(e.target);
   console.log(formData.get("position"));

   //!form verilerinden bir obje oluşturma
const dataObj = Object.fromEntries(formData);
console.log(dataObj);

//!objeye id ekleme
dataObj.id = v4();
console.log(dataObj);

//!eklenme tarihi oluşturma
dataObj.date = new Date().toLocaleDateString();
console.log(dataObj);

//!!! ** 1. ADIM API GÜNCELLEMEK HER ZAMAN (post veri ekleme)
axios.post('http://localhost:3030/jobs',dataObj)
.then(()=>{
  //STORE GÜNCELLEME
  dispatch(addJob(dataObj));
  //ANASAYFAYA YÖNLENDİR
  navigate("/");
  //BİLDİRİM GÖSTER
  toast.success('Başarıyla Eklendi', {
    position: "top-right",
    autoClose: 3000,
    theme: "light",
    
    });
})
  }

  return (
    <div className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form onSubmit={handleSubmit}>
<div className='field'>
  <label>Pozisyon</label>
  <input name="position" type="text" />
</div>

<div className='field'>
  <label>Şirket</label>
  <input name="company" type="text" />
</div>

<div className='field'>
  <label>Lokasyon</label>
  <input name="location" type="text" />
</div>

<div className='field'>
  <label>Durum</label>
  <select name="status">{statusOptions.map((opt)=> (
    <option key={opt.value}>{opt.label}</option>
  ))}</select>
</div>

<div className='field'>
  <label>Tür</label>
  <select name="type">{typeOptions.map((opt)=> (
    <option key={opt.value}>{opt.label}</option>
  ))}</select>
</div>
<button>Ekle</button>
      </form>
    </div>
  );
}

export default AddJob;
