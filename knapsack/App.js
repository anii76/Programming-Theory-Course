import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import { Card, Nav, Navbar, Table, Container, Button } from 'react-bootstrap'
import React, { useState } from "react";
import swal from 'sweetalert';


function App() {
  const [maxWeight, setMaxWeight] = useState(0);
  const [weights, setWeights] = useState([]);
  const [values, setValues] = useState([]);
  const [solution, setSolution] = useState(false);
  const [optimalValue, setOptimalValue] = useState(0);
  const [optimalSet, setOptimalSet] = useState([]);

  const deleteIndex = (index) => {
    let modifiedWeights = [...weights];
    modifiedWeights.splice(index, 1);
    setWeights(modifiedWeights);
    let modifiedValues = [...values];
    modifiedValues.splice(index, 1);
    setValues(modifiedValues);
    setSolution(false);
  };

  const modifyWeight = () => {
    return swal({
      title: `le poinds maximal est à : ${maxWeight}`,
      text: "Saisissez la nouvelle valeur",
      buttons: true,
      content: "input"
    }).then((value) => {
      if (value) {
        if (Number.isInteger(parseInt(value))) {
          swal(`Nouvelle valeur est: ${value}`);
          setMaxWeight(parseInt(value));
          setSolution(false);
        } else {
          swal("Bad input", "La valeur doit être un entier non vide", "error");
        }
      }
    });
  };

  const addObject = () => {
    return swal({
      title: `Créer un nouvel objet`,
      text: "Saisissez le poids du nouvel objet",
      buttons: true,
      content: "input"
    }).then((poids) => {
      if (poids) {
        if (Number.isInteger(parseInt(poids))) {
          swal({
            title: `Créer un nouvel objet (avec un poids: ${poids})`,
            text: "Saisissez la valeur du nouvel objet",
            buttons: true,
            content: "input"
          }).then((valeur) => {
            if (valeur) {
              if (valeur && Number.isInteger(parseInt(valeur))) {
                swal(`L'objet a été créé avec un poids: ${poids} et une valeur: ${valeur}`);
                let newWeights = [...weights];
                newWeights.push(parseInt(poids));
                setWeights(newWeights);
                let newValues = [...values];
                newValues.push(parseInt(valeur));
                setValues(newValues);
                setSolution(false);
              } else {
                swal("Bad input", "La valeur doit être un entier non vide", "error");
              }
            }
          });
        } else {
          swal("Bad input", "La poids doit être un entier non nul", "error");
        }
      }
    });
  };

  const modifyIndex = (index) => {
    return swal({
      title: `L'ancien poids était ${weights[index]}`,
      text: "Saisissez le nouveau poids",
      buttons: true,
      content: "input"
    }).then((poids) => {
      if (poids) {
        if (Number.isInteger(parseInt(poids))) {
          swal({
            title: `L'ancienne valeur était ${values[index]})`,
            text: "Saisissez la nouvelle valeur",
            buttons: true,
            content: "input"
          }).then((valeur) => {
            if (valeur) {
              if (valeur && Number.isInteger(parseInt(valeur))) {
                swal(`L'objet a été modifié avec un poids: ${poids} et une valeur: ${valeur}`);
                let newWeights = [...weights];
                newWeights.splice(index, 1, parseInt(poids));
                setWeights(newWeights);
                let newValues = [...values];
                newValues.splice(index, 1, parseInt(valeur));
                setValues(newValues);
                setSolution(false);
              } else {
                swal("Bad input", "La valeur doit être un entier non vide", "error");
              }
            }
          });
        } else {
          swal("Bad input", "La poids doit être un entier non nul", "error");
        }
      }
    });
  };

  const sacADos = (values, weights, max) => {

    let T = new Array(values.length + 1);
    for (let i = 0; i <= values.length; i++) {
      T[i] = new Array(max + 1).fill(0);
    }

    /* ==== Affichage du tableau =====
    for (let i = 0; i <= values.length; i++) {
      for (let j = 0; j <= max ; j++) {
        console.log("i", i);
        console.log("j", j);
        console.log("T[i][j]: ", T[i][j]);
      }
    }*/

    for (let i = 1; i <= values.length; i++) {
      for (let j = 0; j <= max; j++) {

        if (weights[i - 1] > j) {
          T[i][j] = T[i - 1][j];
        } else {
          T[i][j] = Math.max(T[i - 1][j], T[i - 1][j - weights[i - 1]] + values[i - 1]);
        }

      }
    }

    /* ==== Trouver les objets sélectionnés ===== */
    let i = values.length;
    let j = max;
    let optimal = [];
    while (j >= 0 && i > 0) {
      if (T[i][j] == T[i - 1][j])
        i--
      else {
        optimal.push(i);
        i--;
        j = j - weights[i];
      }
    }

    /* ==== Stocker le résultat ===== */
    setSolution(true);
    setOptimalValue(T[values.length][max]);
    setOptimalSet(optimal);
  }

  console.log("weights: ", weights);
  console.log("values: ", values);
  console.log("maxWeight: ", maxWeight);
  console.log("solution: ", solution);
  console.log("optimalValue: ", optimalValue);
  console.log("optimalSet: ", optimalSet);

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            Théorie de la programmation
        </Navbar.Brand>
          <Nav>
            <Nav.Link><small>By MAKHLOUFI Kenza & BOUROUINA Anfal.</small></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="d-flex my-4 justify-content-center">
        <h3 >{`Le poids maximal est : ${maxWeight}`} </h3>
      </Container>
      <Container style={{ maxWidth: "100vh" }}>
        {(weights && weights.length) ?
          <Table className="" striped>
            <thead>
              <tr>
                <th></th>
                <th>Poids</th>
                <th>Valeur</th>
              </tr>
            </thead>
            <tbody>
              {weights.map((weight, index) =>
                <tr key={index}>
                  <td>{`#${index + 1}`}</td>
                  <td>{weight}</td>
                  <td>{values[index]}</td>
                  <td><Button variant="outline-primary" onClick={() => modifyIndex(index)}><i className="fa fa-edit" /></Button></td>
                  <td><Button variant="outline-danger" onClick={() => deleteIndex(index)}><i className="fa fa-trash" /></Button></td>
                </tr>
              )}
            </tbody>
          </Table>
          : <Card bg="light" style={{ height: "30vh" }} className="justify-content-center align-items-center" >
            Vous devez ajouter des objets d'abord
        </Card>
        }
      </Container>
      <div className="d-flex justify-content-center mt-4">
        <Button className="mx-2" variant="outline-primary" onClick={modifyWeight}>
          Modifier le poids maximal
        </Button>
        <Button className="mx-2" variant="outline-primary" onClick={addObject}>
          Ajouter un objet
        </Button>
        <Button className="mx-2" variant="outline-primary" onClick={() => console.log(sacADos([...values], [...weights], maxWeight))}>
          Afficher la solution optimale
        </Button>
      </div>
      {solution && (<Card border="success" style={{ height: "20vh", maxWidth: "40vh" }} className="mx-auto my-5 d-flex justify-content-center align-items-center" >
        <Card.Title>{`La valeur optimale est : ${optimalValue}`}</Card.Title>
        <Card.Text>{`Les éléments choisis sont : ${[...optimalSet]} .`}</Card.Text>
      </Card>)}


    </React.Fragment>
  );
}

export default App;