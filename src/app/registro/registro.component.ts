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
  guardarIndice:number=0;
  registro:Modal = new Modal;
  esCadena:boolean = true;
  activarBotonEditar:boolean =false;
  
  guardarRegistro:any [] = []
    curso = this.registro.curso
     nota = this.registro.nota
    calificacion = this.registro.calificacion

  constructor() {
    this.cargarLocalStorage();
  }

  enviar(f : NgForm){
    if(f.invalid){
      return Object.values(f.controls).forEach(data=>{
        data.markAsTouched();
      })
    }
   this.registrarDatos(f);
   }

   registrarDatos(f:NgForm):any{
    let prueba = {
      cursos : this.registro.curso,
      notas : this.registro.nota,
      calificaciones: this.registro.calificacion
    }
    
     if((isNaN( parseInt(this.registro.nota) ))){
      this.swalAdvice(false,'error','no puede ingresar cadena');
      return 
      } 

      if(prueba.notas >'20' || prueba.notas < '0') {
        this.swalAdvice(false,'info','maximo nota es 20 y minima es 0');
        return
      }   
      else{  
      this.guardarRegistro.push(prueba);
      prueba.notas>='14' && prueba.notas<='20' ?
       prueba.calificaciones = "aprobado" : 
       prueba.calificaciones="desaprobado";
      }
      this.limpiar(f);
      this. guardarLocalStorage();
   } 
   
   actualizar(f : NgForm){
    let actualizar = {
      cursos : this.registro.curso,
      notas : this.registro.nota,
      calificaciones : this.registro.calificacion
    }
        if(actualizar.notas<'0' || actualizar.notas>'20'){
          this.swalAdvice(false,'info','maximo nota es 20 y minima es 0')
        }
        else{
          
          if(this.guardarIndice>=0){
           
            actualizar.notas>='14' && actualizar.notas<='20' ?
            actualizar.calificaciones = "aprobado" : 
            actualizar.calificaciones="desaprobado";

            for( let i=0 ; i<=this.guardarRegistro.length ; i++ ){
              console.log(this.guardarRegistro[i])
              this.guardarRegistro[this.guardarIndice]['notas']=actualizar.notas
              this.guardarRegistro[this.guardarIndice]['calificaciones']=actualizar.calificaciones
              this.guardarRegistro[this.guardarIndice]['cursos']=actualizar.cursos
          } 
          this.guardarLocalStorage();
          this.cargarLocalStorage();
          this.activarBotonEditar=false
          this.limpiar(f)
          }
        }
  }
   estaAprobado(nota: string): boolean {
    return ((nota) >= '14' && (nota) <= '20') ? true : false;
    }

    guardarLocalStorage(){
      localStorage.setItem('registro',JSON.stringify(this.guardarRegistro))
    }
    cargarLocalStorage(){
      let key = localStorage.getItem('registro')
       if(key) {
        this.guardarRegistro =JSON.parse(key) 
       }
       else {
         this.guardarRegistro = []
       }
    }

    eliminarFila(index:number){
      this.guardarRegistro.splice(index,1)
      localStorage.setItem('registro',JSON.stringify(this.guardarRegistro))
      this.cargarLocalStorage();
    }
     
    editar(index:number){
      this.guardarIndice=index
      if(index>=0){
      this.activarBotonEditar= !this.activarBotonEditar;
      }
    }

    limpiar(f : NgForm){
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