var recuperarJson;
var miIndice;
$(document).ready(function() {

    $('.modal').modal();
    traerInformacion();
});

function traerInformacion(){
    urlString = "http://150.230.95.72:8080/api/Category/all";
    $.ajax({
        method: "GET",
        url: urlString
    })
    .done(
        function(respuesta)
        {
            //alert("Datos"+respuesta);
            recuperarJson = respuesta;
            $('#tablaCategory').dataTable( {
                responsive: true,
                data : respuesta,
                columns: [
                    {"data": "name"},
                    {"data": "description"},
                    {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>"}
                ],
            });
            $('#tablaCategory').dataTable().ajax.reload();
        }
    )
    .fail(
        function()
        {
            //alert("Error servidor");
        }
    )
    .always(
        function()
        {
            //alert("siempre ejecutandose")
        }
    )
    ;
}

function guardarInformacion()
{
    let myData = {
        name:$("#name").val(),
        description:$("#description").val()
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url:"http://150.230.95.72:8080/api/Category/save",
        data: dataToSend,
        datatype:"json",
        cache: false,
        timeout: 600000,
        success:function(respuesta){
            ///Codigo para actualizar tabla sin actualizar toda la página
            $('#tablaCategory').dataTable().fnDestroy();
            traerInformacion();
            ///
            ////Cerrar Modal
            $('#modalGuardar').modal('close');

        },
        error : function(e) {
            alert(e);
        },
        done : function(e) {
            alert(e);
        }
    });
}

/* $(document).on("click", ".btnBorrar", function(){
    //alert(recuperarJson[0].id);
    var table = $('#tablaCategory').DataTable();
    var miIndice;
 }); */

/////Función para capturar el indice del dataTable
 $('#tablaCategory tbody').on( 'click', 'tr', function ()
{
        var table = $('#tablaCategory').DataTable();
        miIndice = table.row( this ).index();
        //alert( 'Row index: '+table.row( this ).index() );
        //alert(miIndice)
        miIndice = recuperarJson[miIndice].id;
        borrarCategoria(miIndice); ////Llamo la función con el id Capturado
});

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.95.72:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){

            ///Codigo para actualizar tabla sin actualizar toda la página
            $('#tablaCategory').dataTable().fnDestroy();
            traerInformacion();
        }
    });

}

/* ///////Boton borrar
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
} */
