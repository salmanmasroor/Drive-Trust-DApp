// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract CarRental {
    struct User {
        string name;
        string email;
        uint rentalDays;
        uint cnic;
        string location;
        uint offer;
        string cnicpic;
        uint time;
        address publicKey;
    }

    bool rented;
    mapping(string => User[]) private  carrequest;
    
    struct Detail {
        address useraddress;
        //address companyaddress;
        uint time;
        uint daysForRent;
        uint price;
    }
    mapping(string => Detail[]) private  requestaccept;

    function setValue(
        string memory _carid,
        string memory _name,
        string memory _email,
        uint _rentalDays,
        uint _cnic,
        string memory _location,
        uint _offer,
        string memory _cnicpic
    ) public {
        // Check if the car ID exists
        if (carrequest[_carid].length > 0) {
            // If the car ID exists, ensure the sender is not already renting it
            for (uint i = 0; i < carrequest[_carid].length; i++) {
                if (msg.sender == carrequest[_carid][i].publicKey) {
                    revert("You already sent a request for this car.");
                }
            }
        }
        // Add the new user to the car with rental start block
        carrequest[_carid].push(User(_name, _email, _rentalDays, _cnic, _location, _offer, _cnicpic,block.timestamp + (_rentalDays * 60 *60 * 24 ), msg.sender));
    }

    function showValues(string memory _carid) public view returns (User[] memory) {
        return carrequest[_carid];
    }

    
    function accept(string memory _carid, address _useraddress) public {
        for (uint i = 0; i < carrequest[_carid].length; i++) {
            require(msg.sender != carrequest[_carid][i].publicKey,"Select Wrong public key");
            if (_useraddress == carrequest[_carid][i].publicKey) {
                rented = true;
                requestaccept[_carid].push(Detail(_useraddress,carrequest[_carid][i].time,carrequest[_carid][i].rentalDays,carrequest[_carid][i].offer));
            }
        }
        if (rented == true) {
            delete carrequest[_carid];
        }
    }

    function rentedlist(string memory _carid) public view returns (Detail[] memory) {
        return requestaccept[_carid];
    }
    
/* function timeover(string memory _carid) public view returns (uint ) {
    uint length = requestaccept[_carid].length;
    require(length > 0, "No details found for the given car ID");
    Detail[] memory result = new Detail[](1);
    result[0] = requestaccept[_carid][length - 1];
    return result[0].time;
}
*/

/*
uint time;
function assignTime(uint _time) public{
    time = block.timestamp + _time;
}

function check()public view returns (bool){
    if(block.timestamp > time){
        return  true;
    }
    else{
        return false;
    }
}
*/

function sendTime(string memory _carid)public view returns(uint){
     uint length = requestaccept[_carid].length;
    require(length > 0, "No details found for the given car ID");
    Detail[] memory result = new Detail[](1);
    result[0] = requestaccept[_carid][length - 1];
    return result[0].time;
}

}