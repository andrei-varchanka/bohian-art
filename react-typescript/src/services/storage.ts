const storageService = (function(){
    var _service;
    function _getService() {
        if(!_service) {
            _service = this;
            return _service
        }
        return _service
    }
    function _setToken(token: string) {
        localStorage.setItem('access_token', token);
    }
    function _getToken() {
        return localStorage.getItem('access_token');
    }

    function _clearToken() {
        localStorage.removeItem('access_token');

    }
    return {
        getService : _getService,
        setToken : _setToken,
        getToken : _getToken,
        clearToken : _clearToken
    }
})();

export default storageService;