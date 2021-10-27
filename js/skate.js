$(document).ready(function() {
    
    $('.modal').modal();
    traerInformacion();


});
/*private Integer id;
private String name;
private String brand;
private Integer year;
private String description;*/

/* function traerInformacion(){
    $.ajax({
        url:"http://localhost:8080/api/Skate/all",
        type: "GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            var o = respuesta.items;
            //alert(o[1].id);
            $('#tablaSkate').dataTable( {
                responsive: true,
                data : o,
                columns: [
                    {"data": "id"},
                    {"data": "name"},
                    {"data": "brand"},
                    {"data": "model"},
                    {"data": "category_id"},
                    {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>"}          
                ],
            });
        }
    });
} */

function guardarInformacion()
{

    

    let myData = {
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(), 
    }
    let dataToSend=JSON.stringify(myData);
    alert(dataToSend);
    $.ajax({
        url:"http://localhost:8080/api/Skate/save",
        type: "POST",
        data: myData,
        datatype:"JSON",
        success:function(respuesta){
            //alert("Se agrego la tabla correctamente");
            location.reload();
        }
    }); 
   /*  $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://localhost:8080/api/Skate/save",
        data: JSON.stringify({'name': name}),
        cache: false,
        success: function(result) {
            $("#msg").html( "<span style='color: green'>Company added successfully</span>" );
            window.setTimeout(function(){location.reload()},1000)
        },
        error: function(err) {
            $("#msg").html( "<span style='color: red'>Name is required</span>" );
        }
    }); */
}

///////Boton borrar
$(document).on("click", ".btnBorrar", function(){
    fila = $(this);           
    user_id = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;		
    opcion = 3; //eliminar        
    var respuesta = confirm("¿Está seguro de borrar el registro "+user_id+"?");
    let myData = {
        id:user_id
    }
    let dataToSend=JSON.stringify(myData);                
    if (respuesta) {            
        $.ajax({
          url: "https://g4ef86a70a56228-db202109252211.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
          type: "DELETE",  
          data: dataToSend,
          contentType: "application/JSON", 
          datatype:"JSON",    
          success: function() {
                location.reload();                 
           }
        });	
    }
 });
//////Boton Editar
 $(document).on("click", ".btnEditar", function(){		        
    opcion = 2;//editar
    fila = $(this).closest("tr");	        
    v_id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID
    var v_name = fila.find('td:eq(1)').text();
    var v_brand = fila.find('td:eq(2)').text();
    var v_model = fila.find('td:eq(3)').text();
    var v_category = parseInt(fila.find('td:eq(4)').text());

    $("#id_e").attr("disabled","disabled");
    
    $("#id_e").val(v_id);
    $("#name_e").val(v_name);
    $("#brand_e").val(v_brand);
    $("#model_e").val(v_model);
    $("#category_id_e").val(v_category);
    $('#modal2').modal('open');		   
});

function editarInformacion()
{
    let myData = {
        id:$("#id_e").val(),
        name:$("#name_e").val(),
        brand:$("#brand_e").val(),
        model:$("#model_e").val(),
        category_id:$("#category_id_e").val(), 
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g4ef86a70a56228-db202109252211.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype:"JSON",
        success:function(respuesta){   
            location.reload();
        }
    });
}

