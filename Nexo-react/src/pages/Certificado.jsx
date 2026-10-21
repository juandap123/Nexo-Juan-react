import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Certificado.css';

export default function Certificado() {
  const { user, certificate, uploadCertificate, deleteCertificate } = useAuth();
  const { showToast } = useCart();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        uploadCertificate({
          fileName: file.name,
          fileData: reader.result,
          fileType: file.type
        });
        showToast('¡Certificado cargado y actualizado con éxito!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!certificate) {
      showToast('No hay ningún certificado registrado para descargar.', 'info');
      return;
    }

    if (certificate.fileData) {
      const link = document.createElement('a');
      link.href = certificate.fileData;
      link.download = certificate.fileName || 'certificado_estudio.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Create a downloadable text representation of the demo certificate
      const certText = `
========================================
       NEXO - CERTIFICADO DE ESTUDIO
========================================

Estudiante:    ${user.name}
Institución:   ${user.school}
Grado:         ${user.grade}°
Estado:        ${certificate.status || 'Verificado'}
Fecha:         ${certificate.uploadDate || '01/09/2026'}
Documento:     ${certificate.fileName || 'certificado_estudio.pdf'}

Certificamos que el estudiante mencionado anteriormente se encuentra matriculado
y activo en el presente año escolar, siendo beneficiario de las tarifas estudiantiles NEXO.
      `;
      const blob = new Blob([certText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = certificate.fileName || 'certificado_estudio.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    showToast('Descargando certificado...');
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este certificado?')) {
      deleteCertificate();
      showToast('Certificado eliminado.', 'info');
    }
  };

  return (
    <div className="certificado-page">
      <main className="certificado-container">
        <div className="certificado-encabezado">
          <h1>Certificado de estudio</h1>
          <p>Aquí puedes consultar y actualizar tu certificado de estudio.</p>
        </div>

        {certificate ? (
          <section className="certificado-card">
            <div className="certificado-titulo">
              <div className="icono-documento">📄</div>
              <div>
                <h2>Certificado de estudio</h2>
                <p>Documento registrado en tu perfil • Estado: <strong style={{ color: '#2e7d32' }}>{certificate.status}</strong></p>
              </div>
            </div>

            {/* VISTA PREVIA */}
            <div className="vista-certificado">
              <div className="documento">
                {certificate.fileData && certificate.fileType?.startsWith('image/') ? (
                  <img
                    src={certificate.fileData}
                    alt="Vista previa del certificado"
                    className="preview-imagen-real"
                  />
                ) : (
                  <div className="documento-contenido">
                    <div className="documento-logo">NEXO</div>
                    <h3>CERTIFICADO DE ESTUDIO</h3>
                    <div className="linea-documento"></div>
                    <p>
                      Este espacio representa la vista previa del certificado de estudio cargado.
                    </p>

                    <div className="datos-documento">
                      <div>
                        <span>Estudiante</span>
                        <strong>{user.name}</strong>
                      </div>

                      <div>
                        <span>Institución</span>
                        <strong>{user.school}</strong>
                      </div>

                      <div>
                        <span>Grado</span>
                        <strong>{user.grade}°</strong>
                      </div>
                    </div>

                    <div className="firma">
                      Firma y sello de la institución
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* INFORMACIÓN */}
            <div className="informacion-certificado">
              <div className="dato-item">
                <span>📎 Archivo</span>
                <strong>{certificate.fileName}</strong>
              </div>

              <div className="dato-item">
                <span>📅 Fecha de subida</span>
                <strong>{certificate.uploadDate}</strong>
              </div>
            </div>

            {/* BOTONES */}
            <div className="acciones">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
              />

              <button
                className="btn-principal"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                🔄 Cambiar certificado
              </button>

              <button
                className="btn-secundario"
                type="button"
                onClick={handleDownload}
              >
                ⬇️ Descargar
              </button>

              <button
                className="btn-eliminar"
                type="button"
                onClick={handleDelete}
              >
                🗑️ Eliminar
              </button>
            </div>
          </section>
        ) : (
          <section className="certificado-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
            <div className="icono-documento" style={{ margin: '0 auto 20px auto' }}>📄</div>
            <h2>No tienes ningún certificado registrado</h2>
            <p style={{ color: '#666', marginBottom: '25px' }}>
              Sube tu certificado de estudio para validar tu cuenta de estudiante y disfrutar de promociones.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
            />
            <button
              className="btn-principal"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              📎 Subir certificado
            </button>
          </section>
        )}

        {/* NOTA */}
        <div className="nota">
          <span>💡</span>
          <div>
            <strong>Ten en cuenta</strong>
            <p>
              El certificado de estudio debe ser legible y emitido por tu institución educativa para validar tu beneficio escolar en NEXO. Se admiten archivos PDF, JPG y PNG.
            </p>
          </div>
        </div>

        <Link to="/perfil" className="volver">
          ← Volver a Mi Perfil
        </Link>
      </main>
    </div>
  );
}
