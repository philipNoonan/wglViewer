const mcVertexShaderSource = `#version 310 es
    precision highp float;
    precision highp int;

    layout(location = 0) in float positionMC;

    uniform float MCScaleFactor;
    uniform mat4 MVP;

    out vec3 TexCoord3D;

    void main()
    {
        highp uint uData = floatBitsToUint(positionMC);

        vec3 vertPoint = 0.5f * vec3((uData & 1072693248u) >> 20u, (uData & 1047552u) >> 10u, uData & 1023u);
        
        TexCoord3D = vertPoint / 512.0f;
        gl_Position = vec4(MVP * vec4((vertPoint / 256.0f) - 1.0f, 1.0f));

    }
`
;

const mcFragmentShaderSource = `#version 310 es
    precision highp float;
    precision highp int;
    precision highp sampler3D;
    
    uniform highp usampler3D volumeData;
    in vec3 TexCoord3D;
    
    out vec4 color;
    
    void main()
    {

//         // ambient
// 	float ambientStrength = 0.1f;
// 	vec3 ambient = ambientStrength * vec3(1.0f);
// // diffuse
//vec3 norm = normalize(Normal);
// 	vec3 lightDir = normalize(lightPos - FragPos);
// 	float diff = max(dot(norm, lightDir), 0.0);
// 	vec3 diffuse = diff * lightColor;
// //specular
// 	float specularStrength = 0.5;
// 	vec3 viewDir = normalize(view[3].xyz - FragPos);
// 	vec3 reflectDir = reflect(-lightDir, norm);
// 	float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
// 	vec3 specular = specularStrength * spec * lightColor;


        //color = vec4(norm * (ambient + diffuse),1.0f);
        vec3 N = normalize(cross(dFdy(TexCoord3D), dFdx(TexCoord3D)));
        color = vec4(smoothstep(-1.0, 1.0, TexCoord3D), 1.0f);
        color = vec4(N, 1.0f);

    }
`
;
