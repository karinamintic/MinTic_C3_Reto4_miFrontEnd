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
            ///Toast
            M.toast({html: 'Felicidades!!! ha creado una categoria'});
            ///
            ////Cerrar Modal
            $('#modalGuardar').modal('close');
            ///Limpiar inputs
            $("#name").val('');
            $("#description").val('');

        },
        error : function(e) {
            alert(e);
        },
        done : function(e) {
            alert(e);
        }
    });
}


/////Función para capturar el indice del dataTable
 $('#tablaCategory tbody').on( 'click', 'tr', function ()
{
        var table = $('#tablaCategory').DataTable();
        miIndice = table.row( this ).index();
        //alert( 'Row index: '+table.row( this ).index() );
        //alert(miIndice)
        miIndice = recuperarJson[miIndice].id;

});
$(document).on("click", ".btnBorrar", function(){

    borrarCategoria(miIndice);
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
            ////
            M.toast({html: 'Ha borrado la categoria'});
        }
    });

}
/////////// EDITAR
/////Recoger datos para el modal
$(document).on("click", ".btnEditar", function(){
    opcion = 2;//editar
    fila = $(this).closest("tr");
    var v_name = fila.find('td:eq(0)').text();
    var v_descripcion = fila.find('td:eq(1)').text();

    $("#name_e").val(v_name);
    $("#description_e").val(v_descripcion);
    $('#modalEditar').modal('open');

});

function editarInformacion()
{
    let myData = {
        id: miIndice, ////desde la función #tablaCategory lo capturo
        name:$("#name_e").val(),
        description:$("#description_e").val(),
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.95.72:8080/api/Category/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            ///Codigo para actualizar tabla sin actualizar toda la página
            $('#tablaCategory').dataTable().fnDestroy();
            traerInformacion();
            ////
            $('#modalEditar').modal('close');
            M.toast({html: 'Ha editado la categoria'});
        }
    });
}

