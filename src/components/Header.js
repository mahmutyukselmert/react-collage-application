function Header({handleBackToPage}) {
    return (
      <header className="p-1 mt-1">
        <div className="container">
          <h1 className="d-flex justify-content-center mb-4"> React Collage App </h1>
          <div className="row">
            <div className="col-md-12">
                  <div className="step-by-step-area">
                    <div className="step-by-step-header">
                      <div className="step" onClick={handleBackToPage}>
                        <i className="fa fa-columns" aria-hidden="true"></i>
                        <h4>Kolaj Türünü Seç</h4>
                      </div>
                      <div className="step">
                        <i className="fa fa-upload" aria-hidden="true"></i>
                        <h4>Kolaj Ayarları</h4>
                      </div>
                      <div className="step">
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <h4>Kolaj'ı İndir</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </header>
    );
}

export default Header;