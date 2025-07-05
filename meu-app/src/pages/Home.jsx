import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";


const HomeForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const watchPassword = watch("password");

  const onSubmit = (data) => {
    // Salva no localStorage
    localStorage.setItem("formData", JSON.stringify(data));
    navigate("/tasks");
  };

  const checkCEP = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");

    // Validação de formato
    if (cep.length !== 8) {
        clearErrors("cep");
        setError("cep", {
        type: "manual",
        message: "Formato de CEP inválido (use 8 dígitos).",
        });
        return;
    }

    clearErrors("cep");

    try {
        const res  = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();

        // CEP não existe na base
        if (data.erro) {
        setError("cep", {
            type: "manual",
            message: "CEP não encontrado.",
        });
        return;
        }

        // CEP válido: popula os campos 
        clearErrors("cep");
        setValue("rua",      data.logradouro);
        setValue("bairro",   data.bairro);
        setValue("cidade",   data.localidade);
        setValue("estado",   data.uf);
        setFocus("numero");

    } catch {
        setError("cep", {
            type: "manual",
            message: "Erro ao buscar o CEP. Tente novamente.",
        });
    } 
};


  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="app-container">

        <h1>Bem-vindo ao Planner!</h1>
        <p>Preencha os campos abaixo para começar:</p>

      <div className="form-group">
        <label>Nome:</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          {...register("name", { required: true })}
        />
        {errors?.name?.type === "required" && (
          <p className="error-message">Preencha seu nome.</p>
        )}
      </div>


      <div className="form-group">
        <label>CEP:</label>
        <input
          className={errors.cep ? "input-error" : ""}
          type="text"
          placeholder="Seu CEP"
          {...register("cep", { required: true })} onBlur={checkCEP}
        />
        {errors.cep && (
          <p className="error-message">{errors.cep.message}</p>
        )}
      </div>


      <div className="form-group">
        <label>Logradouro:</label>
        <input
          className={errors?.rua && "input-error"}
          type="text"
          placeholder="Seu logradouro"
          {...register("rua", { required: true })}
        />
        {errors?.rua?.type === "required" && (
          <p className="error-message">Preencha seu logradouro.</p>
        )}
      </div>


      <div className="form-group">
        <label>Número:</label>
        <input
          className={errors?.numero && "input-error"}
          type="number"
          placeholder="Seu número"
          {...register("numero", { required: true })} 
        />
        {errors?.numero?.type === "required" && (
          <p className="error-message">Preencha seu número.</p>
        )}
      </div>


      <div className="form-group">
        <label>Bairro:</label>
        <input
          className={errors?.bairro && "input-error"}
          type="text"
          placeholder="Seu bairro"
          {...register("bairro", { required: true })}
        />
        {errors?.bairro?.type === "required" && (
          <p className="error-message">Preencha seu bairro.</p>
        )}
      </div>


      <div className="form-group">
        <label>Cidade:</label>
        <input
          className={errors?.cidade && "input-error"}
          type="text"
          placeholder="Sua cidade"
          {...register("cidade", { required: true })}
        />
        {errors?.cidade?.type === "required" && (
          <p className="error-message">Preencha sua cidade.</p>
        )}
      </div>


      <div className="form-group">
        <label>Estado:</label>
        <input
          className={errors?.estado && "input-error"}
          type="text"
          placeholder="Seu estado"
          {...register("estado", { required: true })}
        />
        {errors?.estado?.type === "required" && (
          <p className="error-message">Preencha seu estado.</p>
        )}
      </div>


      <div className="form-group">
        <label>E-mail:</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register("email", { required: true,
            validate: (value) => isEmail(value),
          })}
        />
        {errors?.email?.type === "required" && (
          <p className="error-message">Preencha seu e-mail.</p>
        )}

        {errors?.email?.type === "validate" && (
          <p className="error-message">E-mail inválido.</p>
        )}
      </div>


      <div className="form-group">
        <label>Senha:</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register("password", { required: true, minLength: 7 })}
        />

        {errors?.password?.type === "required" && (
          <p className="error-message">Preencha sua senha.</p>
        )}

        {errors?.password?.type === "minLength" && (
          <p className="error-message">
            Sua senha precisa ter no mínimo 7 caracteres.
          </p>
        )}
      </div>


      <div className="form-group">
        <label>Confirme sua senha:</label>
        <input
          className={errors?.passwordConfirmation && "input-error"}
          type="password"
          placeholder="Repita sua senha"
          {...register("passwordConfirmation", { required: true,
            validate: (value) => value === watchPassword,
          })}
        />
        {errors?.passwordConfirmation?.type === "required" && (
          <p className="error-message">Confirme sua senha.</p>
        )}

        {errors?.passwordConfirmation?.type === "validate" && (
          <p className="error-message">As senhas não são iguais.</p>
        )}
      </div>


      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register("privacyTerms", {
              validate: (value) => value === true,
            })}
          />
          <label>Concordo com os termos de privacidade.</label>
        </div>
        {errors?.privacyTerms?.type === "validate" && (
          <p className="error-message">
            Você precisa concordar com os termos de privacidade.
          </p>
        )}
      </div>


      <div className="form-group">
        <button className='goTopageTasks' type='submit'>Criar conta</button>
      </div>

    </div>

    </form>
  );
};


export default HomeForm;