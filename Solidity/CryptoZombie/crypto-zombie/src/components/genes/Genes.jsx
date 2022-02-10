import React, { useEffect, useState } from 'react';
import "./genes.scss";

const Genes = () => {
  

  const [name, setName] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  return (
    <div className='genes-container'> 
      <div className="gene">
        <span className="gene-name">Head Gene</span>
        <span className="gene-value">1</span>
      </div>
      <div className="gene">
        <span className="gene-name">Eye Gene</span>
        <span className="gene-value">1</span>
      </div>
      <div className="gene">
        <span className="gene-name">Shirt Gene</span>
        <span className="gene-value">1</span>
      </div>
      <div className="gene">
        <span className="gene-name">Skin Color Gene</span>
        <span className="gene-value">1</span>
      </div>
      <div className="gene">
        <span className="gene-name">Eye Color Gene</span>
        <span className="gene-value">1</span>
      </div>
      <div className="gene">
        <span className="gene-name">Clothes Color Gene</span>
        <span className="gene-value">1</span>
      </div>
      <input type="text" className="zombie-name" onChange={onChangeName}/>
    </div>
  )
}

export default Genes