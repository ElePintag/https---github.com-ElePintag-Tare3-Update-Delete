
class Agencia_Model {
  constructor(
    AgenciasId,
    Nombre_Agencia,
    Codigo_Agencia,
    Codigo_SRI,
    Codigosesp,
    Correo,
    Telefono,
    Direccion,
    Ruta
  ) {
    this.AgenciasId = AgenciasId;
    this.Nombre_Agencia = Nombre_Agencia;
    this.Codigo_Agencia = Codigo_Agencia;
    this.Codigo_SRI = Codigo_SRI;
    this.Codigosesp = Codigosesp;
    this.Correo = Correo;
    this.Telefono = Telefono;
    this.Direccion = Direccion;
    this.Ruta = Ruta;
  }
  todos() {
    var html = "";
    $.get("../../Controllers/agencias.controller.php?op=" + this.Ruta, (res) => {
      res = JSON.parse(res);
      $.each(res, (index, valor) => {
        html += `<tr>
                <td>${index + 1}</td>
                <td>${valor.Nombre_Agencia}</td>
                <td>${valor.Codigo_Agencia}</td>
                <td>${valor.Codigo_SRI}</td>
                <td>${valor.Codigosesp}</td>
                <td>${valor.Correo}</td>
                <td>${valor.Telefono}</td>
                <td>${valor.Direccion}</td>
            <td>
            <button class='btn btn-success' onclick='editar(${valor.AgenciasId
          })'>Editar</button>
            <button class='btn btn-danger' onclick='eliminar(${valor.AgenciasId
          })'>Eliminar</button>
            <button class='btn btn-info' onclick='ver(${valor.AgenciasId
          })'>Ver</button>
            </td></tr>
                `;
      });
      $("#tabla_agencia").html(html);
    });
  }

  insertar() {
    var dato = new FormData();
    dato = this.Direccion;
    $.ajax({
      url: "../../Controllers/agencias.controller.php?op=insertar",
      type: "POST",
      data: dato,
      contentType: false,
      processData: false,
      success: function (res) {
        res = JSON.parse(res);
        if (res === "ok") {
          Swal.fire("Agencias", "Agencia Registrada", "success");
          todos_controlador();
        } else {
          Swal.fire("Error", res, "error");
        }
      }
    });
    this.limpia_Cajas();
  }

  uno() {
    var AgenciasId = this.AgenciasId;
    $.post(
      "../../Controllers/agencias.controller.php?op=uno",
      { AgenciasId: AgenciasId },
      (res) => {
        res = JSON.parse(res);
        $("#AgenciasId").val(res.AgenciasId);
        $("#Nombre_Agencia").val(res.Nombre_Agencia);
        $("#Codigo_Agencia").val(res.Codigo_Agencia);
        $("#Codigo_SRI").val(res.Codigo_SRI);
        $("#Codigosesp").val(res.Codigosesp);
        $("#Correo").val(res.Correo);
        $("#Telefono").val(res.Telefono);
        $("#Direccion").val(res.Direccion);
      }
    );
    $("#Modal_agencia").modal("show");
  }

  editar() {
    var dato = new FormData();
    dato = this.Direccion;
    $.ajax({
      url: "../../Controllers/agencias.controller.php?op=actualizar",
      type: "POST",
      data: dato,
      contentType: false,
      processData: false,
      success: function (res) {
        res = JSON.parse(res);
        if (res === "ok") {
          Swal.fire("Agencias", "Agencia Actualizada", "success");
          todos_controlador();
        } else {
          Swal.fire("Error", res, "error");
        }
      }
    });
    this.limpia_Cajas();
  }

  eliminar() {
    var AgenciasId = this.AgenciasId;

    Swal.fire({
      title: "Agencias",
      text: "Esta seguro de eliminar la materia",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        $.post(
          "../../Controllers/agencias.controller.php?op=eliminar",
          { AgenciasId: AgenciasId },
          (res) => {
            res = JSON.parse(res);
            if (res === "ok") {
              Swal.fire("Agencias", "Agencia Eliminada", "success");
              todos_controlador();
            } else {
              Swal.fire("Error", res, "error");
            }
          }
        );
      }
    });

    this.limpia_Cajas();
  }

  Codigo_Agencia_Repetida() {
    var Codigo_Agencia = this.Codigo_Agencia;
    $.post("../../Controllers/agencias.controller.php?op=Codigo_Agencia_Repetida", { Codigo_Agencia: Codigo_Agencia }, (res) => {
      res = JSON.parse(res);
      if (parseInt(res.Codigo_Agencia_Repetida) > 0) {
        $('#CodigoAgencia').removeClass('d-none');
        $('#CodigoAgencia').html('El codigo ingresado, ya exite en la base de datos');
        $('button').prop('disabled', true);
      } else {
        $('#CodigoAgencia').addClass('d-none');
        $('button').prop('disabled', false);
      }

    })
  }

  limpia_Cajas() {
    document.getElementById("Nombre_Agencia").value = "";
    document.getElementById("Codigo_Agencia").value = "";
    document.getElementById("Codigo_SRI").value = "";
    document.getElementById("Codigosesp").value = "";
    document.getElementById("Correo").value = "";
    document.getElementById("Telefono").value = "";
    document.getElementById("Direccion").value = "";
    $("#AgenciasId").val("");
    $("#Modal_agencia").modal("hide");
  }
}
