// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CarMaintenance {
    
    struct Intervention {
        uint256 date;
        uint256 kilometrage;
        string typeIntervention;
        address garage;
    }

    mapping(string => Intervention[]) public historiqueVehicules;

    mapping(address => bool) public garagesAutorises;

    address public proprietaire;

    event InterventionAjoutee(
        string indexed matricule,
        uint256 date,
        uint256 kilometrage,
        string typeIntervention,
        address garage
    );

    modifier onlyAuthorizedGarage() {
        require(garagesAutorises[msg.sender], "Only Authorized Garage");
        _;
    }

    constructor() {
        proprietaire = msg.sender;
        garagesAutorises[msg.sender] = true;
    }

    function autoriserGarage(address _garage) external {
        require(msg.sender == proprietaire, "Seul le proprietaire peut autoriser");
        garagesAutorises[_garage] = true;
    }

    function addIntervention(
        string memory _matricule,
        uint256 _kilometrage,
        string memory _typeIntervention
    ) external onlyAuthorizedGarage {
        Intervention memory nouvelle = Intervention({
            date: block.timestamp,
            kilometrage: _kilometrage,
            typeIntervention: _typeIntervention,
            garage: msg.sender
        });

        historiqueVehicules[_matricule].push(nouvelle);

        emit InterventionAjoutee(
            _matricule,
            block.timestamp,
            _kilometrage,
            _typeIntervention,
            msg.sender
        );
    }

    function getHistory(string memory _matricule) 
        external 
        view 
        returns (Intervention[] memory) 
    {
        return historiqueVehicules[_matricule];
    }
}