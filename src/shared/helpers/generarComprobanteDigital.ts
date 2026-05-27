import QRCode from 'qrcode'

interface Infractor {
  nombre: string
  apellido: string
  documento: number
  cuit: string | null
}

interface EstadoActa {
  id: number
  nombre: string
}

interface Vehiculo {
  dominio?: string | null
}

interface Acta {
  numero_acta: string
  numero_causa: string
  tipo_acta: string
  infractores: Infractor[]
  estados: EstadoActa[]
  vehiculo?: Vehiculo | null
}

interface Actuacion {
  id: number
  fecha: string | null
  total: string | null | number
  path_comprobante?: string | null
}

interface Props {
  acta: Acta
  actuacion: Actuacion
}

export const convertHtmlToPdf = async (
  htmlContent: string
): Promise<Blob> => {
  const formData = new FormData()

  const htmlBlob = new Blob([htmlContent], {
    type: 'text/html',
  })

  formData.append('files', htmlBlob, 'index.html')
  formData.append('index.html', 'index.html')

  const response = await fetch(
    'https://apis.v1.cc.gob.ar/gotenberg/forms/chromium/convert/html',
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error('Error al convertir HTML a PDF')
  }

  return await response.blob()
}

export const generarComprobanteDigital = async ({
  acta,
  actuacion,
}: Props): Promise<void> => {
  const infractor = acta.infractores?.[0]

  const estadoPagado = acta.estados.find(
    (e) => e.nombre === 'Pagada'
  )

  const qrUrl =
    actuacion.path_comprobante ||
    `https://rentas.catamarcaciudad.gob.ar/ui/pago-online-comprobante-juzgado.php?comprobante=${actuacion.id}`

  const qrBase64 = await QRCode.toDataURL(qrUrl)

  const html = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          background: #ffffff;
          padding: 40px;
        }

        .card {
          max-width: 850px;
          margin: auto;
          border: 1px solid #d1d5db;
          border-radius: 14px;
          padding: 40px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 18px;
          margin-bottom: 25px;
        }

        .title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .badge {
          font-size: 12px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 6px;
          background: ${estadoPagado ? '#16a34a' : '#2563eb'};
          color: white;
        }

        .content {
          display: flex;
          gap: 40px;
        }

        .left {
          flex: 1.2;
        }

        .right {
          flex: 0.8;
          text-align: center;
          border-left: 1px solid #e5e7eb;
          padding-left: 30px;
        }

        .section-title {
          font-weight: 700;
          font-size: 14px;
          margin: 20px 0 10px;
          color: #1e3a8a;
        }

        .row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          padding: 4px 0;
        }

        .label {
          font-weight: 600;
          color: #374151;
        }

        .value {
          color: #111827;
        }

        .importe-box {
          margin-top: 25px;
          padding: 16px;
          background: #f1f5f9;
          border-radius: 8px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }

        .qr img {
          width: 160px;
          margin-top: 10px;
        }

        .qr-text {
          font-size: 12px;
          margin-top: 8px;
        }

        .footer {
          margin-top: 30px;
          font-size: 11px;
          text-align: center;
          color: #6b7280;
        }
      </style>
    </head>

    <body>
      <div class="card">

        <div class="header">
          <div class="title">COMPROBANTE DIGITAL DE PAGO</div>
          <div class="badge">${estadoPagado ? 'PAGADO' : 'GENERADO'}</div>
        </div>

        <div class="content">

          <div class="left">

            <div class="section-title">Datos del Acta</div>

            <div class="row">
              <div class="label">N° Acta</div>
              <div class="value">${acta.numero_acta}</div>
            </div>

            <div class="row">
              <div class="label">N° Causa</div>
              <div class="value">${acta.numero_causa}</div>
            </div>

            <div class="row">
              <div class="label">Tipo</div>
              <div class="value">${acta.tipo_acta}</div>
            </div>

            <div class="row">
              <div class="label">Fecha</div>
              <div class="value">${actuacion.fecha ?? '-'}</div>
            </div>

            <div class="section-title">Infractor</div>

            <div class="row">
              <div class="label">Nombre</div>
              <div class="value">
                ${infractor?.nombre ?? ''} ${infractor?.apellido ?? ''}
              </div>
            </div>

            <div class="row">
              <div class="label">DNI</div>
              <div class="value">${infractor?.documento ?? '-'}</div>
            </div>

            <div class="row">
              <div class="label">CUIL</div>
              <div class="value">${infractor?.cuit ?? '-'}</div>
            </div>

            <div class="row">
              <div class="label">Dominio</div>
              <div class="value">${acta.vehiculo?.dominio ?? '-'}</div>
            </div>

            <div class="importe-box">
              IMPORTE ABONADO: $ ${Number(actuacion.total).toLocaleString('es-AR')}
            </div>

          </div>

          <div class="right">
            <div class="qr">
              <img src="${qrBase64}" />
              <div class="qr-text">
                Escanee para verificar el comprobante
              </div>
            </div>
          </div>

        </div>

        <div class="footer">
          Juzgado Municipal de Faltas - Catamarca Capital<br/>
          Documento generado electrónicamente.
        </div>

      </div>
    </body>
  </html>
  `

  const pdfBlob = await convertHtmlToPdf(html)

  const url = URL.createObjectURL(pdfBlob)

  const a = document.createElement('a')
  a.href = url
  a.download = `comprobante-${actuacion.id}.pdf`
  a.click()

  URL.revokeObjectURL(url)
}
