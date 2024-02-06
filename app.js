const hours = ['07-08', '08-09', '09-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23'];
const days = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];

const tbody = document.getElementById('tbody');

fetch('horario.json')
  .then(res => res.json())
  .then(data => {
    // Itera sobre las horas
    hours.forEach(hora => {
      const tr = document.createElement('tr');
      const tdHora = document.createElement('td');
      tdHora.textContent = hora;
      tr.appendChild(tdHora);

      // Itera sobre los días
      days.forEach(dia => {
        const tdCurso = document.createElement('td');
        tdCurso.textContent = '';

        data.forEach(dato => {
          const rango = dato.hora.split('-');
          const horaInicial = rango[0];
          const horaFinal = rango[1];

          if (dia === dato.dia && hora >= horaInicial && hora <= horaFinal) {
            tdCurso.textContent = `(${dato.tope})${dato.codCurso}-${dato.secCurso}/[${dato.codAula}](${dato.teopra})`;
            tdCurso.style.backgroundColor = '#81cae4';
            tdCurso.style.border = '3px solid #34bbe9';
          }
        })

        tr.appendChild(tdCurso);
      })

      tbody.appendChild(tr);
    })
    fusionarCeldas('horario_docente');
  })

function fusionarCeldas (id_tabla) {
  const table = document.getElementById(id_tabla);;
  const rows = table.rows;

  for (let columnIndex = 0; columnIndex < rows[0].cells.length; columnIndex++) {
    let currentContent = null;
    let rowspan = 1;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const cell = rows[rowIndex].cells[columnIndex];
      const cellContent = cell.textContent.trim(); // Obtén el contenido sin espacios en blanco

      if (cellContent !== '') { // Verifica que la celda no esté vacía
        if (currentContent === cellContent) {
          cell.style.display = 'none'; // Ocultar celdas repetidas
          rowspan++;
          rows[rowIndex - rowspan + 1].cells[columnIndex].rowSpan = rowspan;
        } else {
          currentContent = cellContent;
          rowspan = 1;
        }
      }
    }
  }
}

/* barra lateral */
const sidebar = document.querySelector('.sidebar');
const boton = document.querySelector('.barra__boton');
const barra = document.querySelector('.barra');
const main = document.querySelector('.main');

boton.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-move');
  barra.classList.toggle('barra-move');
  main.classList.toggle('main-move');
})

// Desplegar
const desplegar = document.querySelector('.sidebar__item');
const menuDesplegable = document.querySelector('.sidebar__sublist');
const expand = document.querySelector('.expand-more');

desplegar.addEventListener('click', () => {
  if (menuDesplegable.style.maxHeight) {
    menuDesplegable.style.maxHeight = null;
    menuDesplegable.style.opacity = 0;
    expand.classList.remove('rotate');
  } else {
    menuDesplegable.style.maxHeight = menuDesplegable.scrollHeight + 'px';
    menuDesplegable.style.opacity = 1;
    expand.classList.add('rotate');
  }
})

// Mostrar u ocultar contenido
document.addEventListener('DOMContentLoaded', () => {
  // Muestra el primer contenido por defecto al cargar la página
  opcionesContenido[0].classList.add('mostrar');
})

const enlaces = document.querySelector('.sidebar__sublist');
const opcionesContenido = document.querySelectorAll('.contenido');
let objetivo;

enlaces.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target && e.target.tagName === 'A') {
    objetivo = e.target.getAttribute('href');
    opcionesContenido.forEach(opcion => {
      opcion.classList.remove('mostrar');
    })

    const mostrarContenido = document.querySelector(objetivo);
    mostrarContenido.classList.add('mostrar');
  }
})

// Paginacion
const pagination = document.querySelector('.pagination')
const pagination__link = document.querySelectorAll('.pagination__link')
const pages = document.querySelectorAll('.page')

pagination.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target && e.target.tagName === 'A') {
    const id = e.target.getAttribute('data-id')
    pagination__link.forEach((btn) => {
      btn.classList.remove('active')
    })

    e.target.classList.add('active')

    pages.forEach((page) => {
      page.classList.remove('active')
    })

    const elemento = document.querySelector(`#${id}`)
    elemento.classList.add('active')
  }
})

// Formulario modal
const btns_modal = document.querySelectorAll('.btn-modal')
const modals = document.querySelectorAll('.modal')
const closeModal = document.querySelectorAll('.btn-cerrar')
const selects = document.querySelectorAll('.modal-1 .selector select')

function refrescarModal () {
  selectoresOcultos.forEach((select) => { select.style.display = 'none' })
  selects.forEach(select => { select.value = '' })
}

btns_modal.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    refrescarModal()
    const modalId = button.getAttribute('data-modal')
    const modal = document.querySelector(`.${modalId}`)
    modal.classList.add('modal--show')
  })
})

closeModal.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    modals.forEach((modal) => {
      modal.classList.remove('modal--show')
    })
  })
})

// Selecciones
const selectores = document.querySelectorAll('.modal-1 .selector')
const selectoresOcultos = document.querySelectorAll('.grupo.oculto')

selectores.forEach((select) => {
  select.addEventListener('change', (e) => {
    const selectId = e.target.id
    const index = e.target.selectedIndex

    switch (selectId) {
      case 'p':
        if (index === 1) {
          selectoresOcultos[0].style.display = 'flex'
          selectoresOcultos[9].style.display = 'none'
        } else if (index == 2) {
          selectoresOcultos.forEach((select) => { select.style.display = 'none' })
          selectoresOcultos[9].style.display = 'flex'
        }
        break
      case 'depa':
        index > 0 && (selectoresOcultos[1].style.display = 'flex')
        break
      case 'prov':
        index > 0 && (selectoresOcultos[2].style.display = 'flex')
        break
      case 'dis':
        for (let i = 3; i < selectoresOcultos.length - 1; i++) {
          selectoresOcultos[i].style.display = 'flex'
        }
        break
    }
  })
})

// Selects anidados
const selectPais = document.querySelector('#p')
const selectDepartamento = document.querySelector('#depa')
const selectProvincia = document.querySelector('#prov')
const selectDistrito = document.querySelector('#dis')

function cargarDepartamentos () {
  fetch('departamentos.json')
    .then(response => response.json())
    .then(data => {
      let options = '<option value="" selected>Elige un departamento</option>'
      data.forEach((depa) => {
        options += `<option value="${depa.id}">${depa.name}</option>`
        selectDepartamento.innerHTML = options
      })
    })
}

function cargarProvincias (depa_id) {
  fetch('provincias.json')
    .then(response => response.json())
    .then(data => {
      let options = '<option value="" selected>Elige una provincia</option>'
      data.forEach((prov) => {
        if (prov.department_id === depa_id) {
          options += `<option value="${prov.id}">${prov.name}</option>`
          selectProvincia.innerHTML = options
        }
      })
    })
}

function cargarDistritos (prov_id) {
  fetch('distritos.json')
    .then(response => response.json())
    .then(data => {
      let options = '<option value="" selected>Elige una distrito</option>'
      data.forEach((dis) => {
        if (dis.province_id === prov_id) {
          options += `<option value="${dis.id}">${dis.name}</option>`
          selectDistrito.innerHTML = options
        }
      })
    })
}

selectPais.addEventListener('change', () => { if (selectPais.selectedIndex === 1) { cargarDepartamentos() } })

selectDepartamento.addEventListener('change', e => cargarProvincias(e.target.value))

selectProvincia.addEventListener('change', e => cargarDistritos(e.target.value))

/* ----ASISTENCIA ---- */
dayjs.locale('es');
// Agregar semestres
const selectSemestre = document.querySelector('#semestre')

function agregarSemestre () {
  fetch('asistencia.json')
    .then(response => response.json())
    .then(data => {
      let options = '<option value="">Selecciona un semestre</option>'
      data.forEach(semestre => {
        options += `<option value="${semestre.id}">${semestre.semestre}</option>`
        selectSemestre.innerHTML = options
      })
    })
}
document.addEventListener('DOMContentLoaded', agregarSemestre)

// Diferencia de meses

function crearBotonesConMeses (id_semestre) {
  fetch('asistencia.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(dato => {
        if (dato.id == id_semestre) {
          const fechaFinal = dayjs(dato.fechaFinal);
          const fechaInicio = dayjs(dato.fechaInicio);

          const meses = fechaFinal.diff(fechaInicio, 'month') + 1;

          const contenedor = document.querySelector(".contenedorDeMeses");
          contenedor.innerHTML = '';

          for (let i = 0; i < meses; i++) {
            const mesInicio = fechaInicio.add(i, 'month')

            const contenedorPar = document.createElement('div')

            const boton = document.createElement('button')
            boton.textContent = mesInicio.format('MMMM YYYY').toUpperCase()

            boton.classList.add('btn-mes')
            boton.setAttribute('data-mes', mesInicio.format('YYYY-MM'))

            const contenedorTabla = document.createElement('div')
            contenedorTabla.classList.add('tabla', 'tabla-oculta')

            contenedorPar.appendChild(boton);
            contenedorPar.appendChild(contenedorTabla);
            contenedor.appendChild(contenedorPar);

            boton.addEventListener('click', () => {
              document.querySelectorAll('.tabla').forEach(tabla => {
                tabla.classList.add('tabla-oculta')
              })

              contenedorTabla.classList.remove('tabla-oculta')

              generarTabla(dato.semestre, mesInicio.format('YYYY-MM'), contenedorTabla)
            })
          }
        }
      })
    })
}

function generarTabla (semestre, mes, contenedor) {
  fetch('data-asistencia.json')
    .then(response => response.json())
    .then(data => {
      const tabla = document.createElement('table')
      const cabecera = document.createElement('tr')

      cabecera.innerHTML = `<th>Dia</th>
                                <th>Curso</th>
                                <th>Horario</th>
                                <th>Marcacion</th>
                                <th>Estado</th>`;

      tabla.appendChild(cabecera);

      data.forEach(dato => {
        if ((dato.semestre === semestre) && (dato.fecha.substring(0, 7) === mes)) {
          const fila = document.createElement('tr')

          fila.innerHTML = `<td>${dayjs(dato.fecha).format('dddd')} ${dayjs(dato.fecha).format('D')}</td>
                            <td>${dato.curso}</td>
                            <td>${dato.horario}</td>
                            <td>${dato.marcacion}</td>
                            <td>${dato.estado ? "<img src='img/check.png'>" : "<img src='img/no_check.png'>"}</td>`;

          tabla.appendChild(fila);
        }
      })
      contenedor.innerHTML = '';
      contenedor.appendChild(tabla);
    })
}

selectSemestre.addEventListener('change', e => crearBotonesConMeses(e.target.value));
