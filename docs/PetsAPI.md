# PetsAPI

All URIs are relative to *http://petstore.swagger.io/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createPets**](PetsAPI.md#createpets) | **POST** /pets | Create a pet
[**listPets**](PetsAPI.md#listpets) | **GET** /pets | List all pets
[**showPetById**](PetsAPI.md#showpetbyid) | **GET** /pets/{petId} | Info for a specific pet


# **createPets**
```swift
    open class func createPets(completion: @escaping (_ data: Void?, _ error: Error?) -> Void)
```

Create a pet

### Example 
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient


// Create a pet
PetsAPI.createPets() { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

Void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listPets**
```swift
    open class func listPets(limit: Int? = nil, completion: @escaping (_ data: [Pet]?, _ error: Error?) -> Void)
```

List all pets

### Example 
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let limit = 987 // Int | How many items to return at one time (max 100) (optional)

// List all pets
PetsAPI.listPets(limit: limit) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Int** | How many items to return at one time (max 100) | [optional] 

### Return type

[**[Pet]**](Pet.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **showPetById**
```swift
    open class func showPetById(petId: String, completion: @escaping (_ data: Pet?, _ error: Error?) -> Void)
```

Info for a specific pet

### Example 
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let petId = "petId_example" // String | The id of the pet to retrieve

// Info for a specific pet
PetsAPI.showPetById(petId: petId) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **petId** | **String** | The id of the pet to retrieve | 

### Return type

[**Pet**](Pet.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

