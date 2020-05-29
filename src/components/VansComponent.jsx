import React from 'react'

const VansComponent = (props) => {

    // driver_id = models.ForeignKey(Driver, on_delete=models.CASCADE)
    // Vehicle_id = models.AutoField(primary_key=True)
    // name = models.CharField(max_length = 100, null = True)
    // VehiclesRegistration = models.CharField(max_length=20, null=True)
    // VehiclesDVLANumber = models.CharField(max_length=40, null=True)
    // VehicleOwned = models.BooleanField(default=False)
    // vehicleType = models.CharField(max_length=20, default='standard')

    return (
        <div className='main_div_vans'>     
            <div className='inner_vans_component_div_left'>
                <button className='compliance_add_driver_button_submit' id='add_van_button'>
                    <span className='span_in_complaince_button'>Add Van</span> 
                </button>
                <div>
                    <h2>Van Documents</h2>
                </div>
            </div>      
        </div>
    )
}

export default VansComponent