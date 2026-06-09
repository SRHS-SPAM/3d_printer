import React from 'react';
import './mainPage.css';
import { useNavigate } from 'react-router-dom';

function MainPage({ printerStates, setPrinterStates }) {
  const navigate = useNavigate();

  const handleUseClick = (index) => {
    const newStates = [...printerStates];
    newStates[index] = newStates[index] === 'available' ? 'in_use' : 'available';
    setPrinterStates(newStates);
  };

  const getImage = (state) => {
    if (state === 'available') return '/Available.png';
    if (state === 'reserved') return '/bookable.png';
    return '/In_Use.png';
  };

  return (
    <>
      <div className="main-title">
        <img src="/main.png" alt="M" className="m-image" />
        <div className="title-font">우리 학교 3D 프린터를<br /> 한 곳에서.</div>
      </div>

      <div className="main-container">
        <div className="title-row">
          <p className="title-font">프린터 상태 표시</p>
          <button type="button" className="res-button" onClick={() => navigate('/Reservation')}>
            예약 바로 가기 &gt;
          </button>
        </div>

        <div className="status-container">
          <p>2층 소프트웨어 3D프린터</p>
          <hr/>
          <div className="image-container-new">
            {printerStates.map((state, index) => (
              <div key={index} className="printer-card">
                <p className="printer-name">프린터{['A','B','C','D'][index]}</p>  {/* ✅ 추가 */}
                <img
                  src={getImage(state)}
                  alt={state}
                  className="status-img-new"
                />
                <button
                  type="button"
                  onClick={() => handleUseClick(index)}
                  disabled={state === 'reserved'}
                  className={`status-button-new ${state === 'available' ? 'available' : 'unavailable'}`}
                >
                  {state === 'available' ? '사용하기' : '사용 불가'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;