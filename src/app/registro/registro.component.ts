import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Modal } from './registroModal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  saveIndex:number=0;
  registre:Modal = new Modal;
  activeButtonEdit:boolean =false;
  expretion = '[A-Za-z]'	
  saveRegistre:any [] = []
    course = this.registre.course
     note = this.registre.note
    calification = this.registre.calification

  constructor() {
    this.getLocalStorage();
  }

  send(f : NgForm){
    if(f.invalid){
      return Object.values(f.controls).forEach(data=>{
        data.markAsTouched();
      })
    }
   this.registerData(f);
   }

   registerData(f:NgForm):any{
    let test = {
    courses : this.registre.course,
    notes : this.registre.note,
    califications: this.registre.calification
    }
    
    if((isNaN( parseInt(test.notes) ))){
    this.swalAdvice(false,'error','no puede ingresar cadena');
    return 
    } 

   if( parseInt(test.notes)>20 || parseInt(test.notes) < 0) {
      this.swalAdvice(false,'info','maximo nota es 20 y minima es 0');
      return
      }   
   else{  
    this.saveRegistre.push(test);
    parseInt(test.notes) >=14 && parseInt(test.notes) <=20 ?
    test.califications = "aprobado" : 
    test.califications="desaprobado";
    }
    this.clean(f);
    this.setLocalStorage();
   } 
   
    update(f : NgForm){
     let update = {
      courses : this.registre.course,
      notes : this.registre.note,
      califications : this.registre.calification
      }

      if(update.notes.match(this.expretion)){
        this.swalAdvice(false,'error','no puede ingresar cadena');
        this.clean(f)
        this.activeButtonEdit=false
        return 
      }

      if((isNaN( parseInt(update.notes) ))){
        this.swalAdvice(false,'error','no puede ingresar cadena');
        this.clean(f)
        this.activeButtonEdit=false
        return 
        } 

      if( parseInt(update.notes) < 0 || parseInt(update.notes) > 20){
      this.swalAdvice(false,'info','maximo nota es 20 y minima es 0')
      }
      else{
          
      if(this.saveIndex>=0){
           
      parseInt(update.notes) >=14 && parseInt(update.notes) <= 20 ?
      update.califications = "aprobado" : 
      update.califications="desaprobado";
              
      for( let i=0 ; i<=this.saveRegistre.length ; i++ ){
              
      this.saveRegistre[this.saveIndex]['notes']=update.notes
      this.saveRegistre[this.saveIndex]['califications']=update.califications
      this.saveRegistre[this.saveIndex]['courses']=update.courses
      } 
      this.setLocalStorage();
      this.getLocalStorage();
      this.activeButtonEdit=false
      this.clean(f)
      }
      }
  }

  edit(index:number){
    this.saveIndex=index
    this.activeButtonEdit= !this.activeButtonEdit;
    if(index>=0){
   
    for(let i=0 ; i<=this.saveRegistre.length ; i++){
      this.registre.course=this.saveRegistre[this.saveIndex]['courses']
      this.registre.note=this.saveRegistre[this.saveIndex]['notes']
    }
    }
  }

   isAprove(note: string): boolean {
    return (parseInt(note) >= 14 && parseInt(note) <= 20) ? true : false;
    }

    setLocalStorage(){
      localStorage.setItem('registro',JSON.stringify(this.saveRegistre))
    }
    getLocalStorage(){
    let key = localStorage.getItem('registro')
    if(key) {
    this.saveRegistre =JSON.parse(key)} 
    
    else {
   this.saveRegistre = []}   
   }

  deleteRow(index:number){
  this.saveRegistre.splice(index,1);
  this.setLocalStorage()
  this.getLocalStorage();
  }
    
  clean(f : NgForm){
  return Object.values(f.controls).forEach(data=>{
  data.reset();
  data.markAsUntouched();
  })
  }

  swalAdvice(allow:boolean , icons:any , text:string){
  Swal.fire({
   allowOutsideClick: allow,
   icon : icons,
   text : text
    })
  }
}