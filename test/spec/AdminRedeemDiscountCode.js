/*

   Copyright 2016 Gregor Wolf

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/
describe("Read discount value for customer", function() {
    it("should return discount value", function() {
        csrfToken = getCSRFtokenAndLogin("BSADMIN", password);

        var check = {
            "SHA256HASH": SHA256HASH
        };
        var DiscountCodeURL = "/de/linuxdozent/gittest/odata/checkDiscountCode.xsjs";
        var xhr = prepareRequest("POST", DiscountCodeURL);
        xhr.send(JSON.stringify(check));
        expect(xhr.status).toBe(200);
        var body = xhr.responseText ? JSON.parse(xhr.responseText) : "";
        expect(body.OUTC[0].DiscountValue).toBe(10);
    });
});

describe("Check discount code using GET", function() {
    it("should return discount value", function() {
        var DiscountCodeURL = "/de/linuxdozent/gittest/odata/checkDiscountCode.xsjs" + "?SHA256HASH=" + encodeURIComponent(SHA256HASH);
        var xhr = prepareRequest("GET", DiscountCodeURL);
        xhr.send();
        expect(xhr.status).toBe(200);
        var body = xhr.responseText ? JSON.parse(xhr.responseText) : "";
        expect(body.OUTC[0].DiscountValue).toBe(10);
    });
});


describe("Redeem Discount Codes of the user", function() {
    it("should redeem discount codes", function() {

        var xhr = prepareRequest("PATCH", DiscountCodeUri);
        var change = {
            "SHA256HASH": SHA256HASH
        };
        xhr.send(JSON.stringify(change));
        expect(xhr.status).toBe(204);

        logout(csrfToken);
        checkSession();
    });
});
