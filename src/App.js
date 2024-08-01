import React, { useCallback, useState, useRef, useEffect } from "react"; // Import useState for state management
import html2canvas from 'html2canvas';

import Header from './components/Header';
import Footer from './components/Footer';

//Collage Type Input Radio Template 
import CollageTypesInputRadioTemplate from "./components/CollageTypesInputRadioTemplate";

import CollageApp from './components/Collage/CollageApp'; // CollageApp componentini içe aktarın

import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./styles/App.min.css";

function App() {
  const [collageType, setCollageType] = useState(""); // Selected collage type (3, 4, etc.)
  const [allowedImageCount, setAllowedImageCount] = useState(0); //
  const [selectedFiles, setSelectedFiles] = useState([]); // Array of selected files
  const [isCollageTypeReady, setIsCollageTypeReady] = useState(true); // First Page
  const [isCollageReady, setIsCollageReady] = useState(false); // Flag for collage display

  const collageTypeSelectButton = useRef(null);

  useEffect(() => {
    if (collageType >= 1) {
      collageTypeSelectButton.current.click();
    }
  }, [collageType]);

  const handleBackToPage = () => {
    setIsCollageTypeReady(true);
    setIsCollageReady(false);
  };

  const handleContinue = () => {
    if (collageType >= 1) {
      setIsCollageTypeReady(false);
      setIsCollageReady(true);
      if(collageType == 1) {
        setAllowedImageCount(3);
      } else if(collageType == 2) { 
        setAllowedImageCount(3);
      } else if(collageType == 3) { 
        setAllowedImageCount(3);
      } else if(collageType == 4) { 
        setAllowedImageCount(3);
      } else if(collageType == 5) { 
        setAllowedImageCount(4);
      }
    } else {
      alert("Hata! Lütfen bir Collage Türü seçin!");
    }
  };

  const collageRef = useRef();

  const handleDownload = () => {

    let images = document.querySelectorAll('.resizer');
    images.forEach(image => {
      image.style.border = 0;
    });

    let sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
      slider.style.display = 'none';
    });

    html2canvas(collageRef.current).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'collage.png';
      link.click();

      images.forEach(image => {
        image.style.border = '';
      });

      sliders.forEach(slider => {
        slider.style.display = '';
      });
    });

  };

  const isCollageSaveDisabled = () => {
    if (collageType == 5) {
      return selectedFiles.length !== 4;
    } else {
      return selectedFiles.length !== 3;
    }
  };

  return (
    <div>
      <Header handleBackToPage={handleBackToPage} />
      <section className="container">
        <div className="row">
          <div className="col-lg-12 mx-auto">
          
            <div className="card">
              <div className="card-body">
                {isCollageTypeReady && (
                  <div className="row">
                    
                    <div className="row mb-4 m-0 p-0 d-flex justify-content-center">

                      <CollageTypesInputRadioTemplate id="exampleCheck1" value="1" collageType={collageType} setCollageType={setCollageType}>
                        <table className="table table-responsive table-bordered text-center">
                          <tbody>
                            <tr>
                              <td rowSpan="2">1</td>
                              <td>2</td>
                            </tr>
                            <tr>
                              <td>3</td>
                            </tr>
                          </tbody>
                        </table>
                      </CollageTypesInputRadioTemplate>

                      <CollageTypesInputRadioTemplate id="exampleCheck2" value="2" collageType={collageType} setCollageType={setCollageType}>
                        <table className="table table-responsive table-bordered text-center">
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td rowSpan="2">2</td>
                                </tr>
                                <tr>
                                  <td>3</td>
                                </tr>
                              </tbody>
                            </table>
                      </CollageTypesInputRadioTemplate>

                      <CollageTypesInputRadioTemplate id="exampleCheck3" value="3" collageType={collageType} setCollageType={setCollageType}>
                        <table className="table table-responsive table-bordered text-center">
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>2</td>
                                </tr>
                                <tr>
                                  <td colSpan={2} className="text-center">
                                    3
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                      </CollageTypesInputRadioTemplate>
                     
                      <CollageTypesInputRadioTemplate id="exampleCheck4" value="4" collageType={collageType} setCollageType={setCollageType}>
                        <table className="table table-responsive table-bordered text-center">
                              <tbody>
                                <tr>
                                  <td colSpan={2} className="text-center">
                                    1
                                  </td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>3</td>
                                </tr>
                              </tbody>
                            </table>
                      </CollageTypesInputRadioTemplate>

                      <CollageTypesInputRadioTemplate id="exampleCheck5" value="5" collageType={collageType} setCollageType={setCollageType}>
                        <table className="table table-responsive table-bordered">
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>2</td>
                                </tr>
                                <tr>
                                  <td>3</td>
                                  <td>4</td>
                                </tr>
                              </tbody>
                            </table>
                      </CollageTypesInputRadioTemplate>
                      
                    </div>

                    <div className="row mt-2 m-0 p-0">
                      <div className="col-lg-12">
                        <button className="btn btn-primary w-100" ref={collageTypeSelectButton} onClick={handleContinue} >
                          Devam Et
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {isCollageReady && ( 
                  <div className='file-inputs px-2 d-block d-md-flex d-lg-flex justify-content-between mb-4'>
                    {Array(parseInt(allowedImageCount))
                      .fill(0)
                      .map((_, index) => (
                        <input
                          className="col-12 col-lg-3 col-lg-3"
                          key={index}
                          type='file'
                          accept='image/*'
                          onChange={(event) => {
                            const newFiles = [...selectedFiles];
                            newFiles[index] = event.target.files[0];
                            setSelectedFiles(newFiles);
                          }}
                        />
                      ))}
                  </div>
                )}

                {isCollageReady && ( 
                  <div className="row">
                    <div className="collage-container">
                      <div className="mx-auto p-0">
                        <div id="MovableCollage"> 
                          <CollageApp selectedFiles={selectedFiles} collageType={collageType} collageRef={collageRef} />
                        </div>
                      </div> 

                      <div className="mt-4 col-12 col-lg-5 mx-auto">
                        <div className="d-block px-2 px-lg-0 d-lg-flex justify-content-between">
                        <button className="btn btn-secondary mb-2 mr-auto" onClick={handleBackToPage}> Kolaj Türünü Değiştir </button>
                        <button id="collage-save-button" onClick={handleDownload} className="btn btn-primary ml-auto" disabled={isCollageSaveDisabled()}>
                          <i className="fa fa-download" aria-hidden="true"></i>
                          &nbsp; Kolaj'ı Kaydet
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
